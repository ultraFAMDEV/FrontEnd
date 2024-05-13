import React, { useState } from "react";
import { useRouter } from "next/router";

export default function NouveauCommentaireForm({ onSubmit, resourceId }) {
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/connexion");
        return;
      }

      const response = await fetch(
        "https://famdev.srvkoikarpfess.ddns.net/api/v1/commentaire",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            texte: nouveauCommentaire,
            ressource_id: parseInt(resourceId), // Convertir en entier
          }),
        }
      );

      if (response.ok) {
        onSubmit();
        setNouveauCommentaire("");
      } else {
        console.error("Échec lors de l'ajout du commentaire");
      }
    } catch (error) {
      console.error("Échec lors de l'ajout du commentaire:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={nouveauCommentaire}
        onChange={(e) => setNouveauCommentaire(e.target.value)}
        placeholder="Ajouter un commentaire..."
      ></textarea>{" "}
      <br></br>
      <button type="submit">Envoyer</button>
    </form>
  );
}
