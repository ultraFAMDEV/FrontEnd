import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
//PENSER à AJOUTER UNE LISTE DE CATEGORIE ET LA VISIBILITE
export default function NewRessource() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media: null,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

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
      formDataToSend.append("categorie", "1");
      formDataToSend.append("visibilite", "public");
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
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }

      const data = await response.json();
      console.log("Ressource créée avec succès:", data);
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
      <div>
        <h1>Nouvelle Ressource</h1>
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <div>
            <label htmlFor="title">Titre :</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description :</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="media">Fichier :</label>
            <input
              type="file"
              id="media"
              name="media"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Poster</button>
        </form>
      </div>
    </>
  );
}
