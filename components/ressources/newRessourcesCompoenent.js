import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/components/ressources/NewRessource.module.css";

export default function NewRessource() {
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    media: null,
    categorie: "",
  });
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/categorie`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Échec lors de la récupération des catégories");
        }
      } catch (error) {
        console.error("Échec lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/connexion");
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("titre", formData.titre);
      formDataToSend.append("contenu", formData.contenu);
      formDataToSend.append("categorieName", formData.categorie);
      formDataToSend.append("visibilite", "publique");
      formDataToSend.append("userid", token);

      if (formData.media) {
        formDataToSend.append("media", formData.media);
      }

      const response = await fetch(`${API_ENDPOINT}/ressources`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Échec lors de la création de la ressource");
      }

      console.log("Ressource créée avec succès");
      router.push("/");
    } catch (error) {
      console.error("Erreur lors de la création de la ressource:", error);
      setError("Erreur lors de la création de la ressource");
    }
  };

  return (
    <>
      <Head>
        <title>Nouvelle Ressource</title>
      </Head>
      <div className={style.container}>
        <h1 className={style.title}>Nouvelle Ressource</h1>
        <form className={style.form} onSubmit={handleSubmit}>
          {error && <p className={style.error}>{error}</p>}
          <div className={style.formGroup}>
            <label htmlFor="titre" className={style.label}>
              Titre :
            </label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className={style.input}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="contenu" className={style.label}>
              Contenu :
            </label>
            <textarea
              id="contenu"
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
              className={style.textarea}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="categorie" className={style.label}>
              Catégorie :
            </label>
            <select
              id="categorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className={style.select}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option
                  key={category.id_categorie}
                  value={category.id_categorie}
                >
                  {category.nom_categorie}
                </option>
              ))}
            </select>
          </div>
          <div className={style.formGroup}>
            <label htmlFor="media" className={style.label}>
              Fichier :
            </label>
            <input
              type="file"
              id="media"
              name="media"
              onChange={handleChange}
              className={style.fileInput}
            />
          </div>
          <button type="submit" className={style.button}>
            Poster
          </button>
        </form>
      </div>
    </>
  );
}
