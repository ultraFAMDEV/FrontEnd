import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/components/ressources/NewRessource.module.css";

export default function NewRessource() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null,
    categorie: "",
  });
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://famdev.srvkoikarpfess.ddns.net/api/v1/categorie",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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

      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("categorie", formData.categorie); // Utilisation de la catégorie sélectionnée
      formDataToSend.append("visibilite", "publique");
      formDataToSend.append("status_id", "1");
      formDataToSend.append("id_commentaire", "1");

      if (formData.media) {
        formDataToSend.append("media", formData.media);
      }

      const response = await fetch(
        "https://famdev.srvkoikarpfess.ddns.net/api/v1/ressources",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

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
            <label htmlFor="title" className={style.label}>
              Titre :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={style.input}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="description" className={style.label}>
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
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
                <option key={category.id} value={category.id}>
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
