import React, { useState } from "react";
import { useRouter } from "next/router";
import style from "@/styles/components/ressources/AjoutCommentaire.module.css";

export default function NouveauCommentaireForm({ onSubmit, resourceId }) {
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");
  const router = useRouter();
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/connexion");
        return;
      }

      const response = await fetch(`${API_ENDPOINT}/commentaire`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          texte: nouveauCommentaire,
          ressource_id: parseInt(resourceId), // Convertir en entier
        }),
      });

      if (response.ok) {
        // Actualiser les commentaires après l'ajout d'un nouveau commentaire
        onSubmit();
        // Réinitialiser le champ de saisie du commentaire
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
        placeholder="Ajouter un commentaire"
        className={style.commentaire}
      ></textarea>{" "}
      <br></br>
      <button type="submit" className={style.submitCommentaire}>
        Envoyer
      </button>
    </form>
  );
}
