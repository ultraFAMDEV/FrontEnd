import React, { useState } from "react";

export default function NouveauCommentaireForm({ onSubmit, resourceId }) {
  const [nouveauCommentaire, setNouveauCommentaire] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://famdev.srvkoikarpfess.ddns.net/api/v1/commentaire",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            texte: nouveauCommentaire,
            ressource_id: resourceId,
          }),
        }
      );
      if (response.ok) {
        // Mettre à jour la liste des commentaires après avoir ajouté le nouveau commentaire
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
        placeholder="Ajouter un commentaire..."
      ></textarea>{" "}
      <br></br>
      <button type="submit">Envoyer</button>
    </form>
  );
}
