import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/components/ressources/Ressource.module.css";
import NavbarComponent from "@/components/navbarComponent";
import NouveauCommentaireForm from "@/components/ressources/newCommentaireComponent";

export default function Ressource() {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const calculateElapsedTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const elapsedTime = now - date;
    const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

    return days;
  };

  const router = useRouter();
  const { id } = router.query;

  const [ressource, setRessource] = useState(null);
  const [commentaires, setCommentaires] = useState([]);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        const response = await fetch(
          `https://famdev.srvkoikarpfess.ddns.net/api/v1/ressources?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setRessource(data);
        } else {
          console.error("Échec lors de la récupération de la ressource");
        }
      } catch (error) {
        console.error("Échec lors de la récupération de la ressource:", error);
      }
    };

    const fetchCommentaires = async () => {
      try {
        const response = await fetch(
          `https://famdev.srvkoikarpfess.ddns.net/api/v1/commentaire?ressource_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCommentaires(data);
        } else {
          console.error("Échec lors de la récupération des commentaires");
        }
      } catch (error) {
        console.error("Échec lors de la récupération des commentaires:", error);
      }
    };

    if (id) {
      fetchRessource();
      fetchCommentaires();
    }
  }, [id]);

  const handleSubmit = async (nouveauCommentaireTexte) => {
    try {
      const response = await fetch(
        `https://famdev.srvkoikarpfess.ddns.net/api/v1/commentaire`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ressource_id: id,
            commentaire_texte: nouveauCommentaireTexte,
          }),
        }
      );
      if (response.ok) {
        // Après avoir ajouté un nouveau commentaire avec succès, mettre à jour la liste des commentaires
        const updatedCommentaires = await fetchUpdatedCommentaires();
        setCommentaires(updatedCommentaires);
      } else {
        console.error("Échec lors de l'ajout du commentaire");
      }
    } catch (error) {
      console.error("Échec lors de l'ajout du commentaire:", error);
    }
  };

  const fetchUpdatedCommentaires = async () => {
    try {
      const response = await fetch(
        `https://famdev.srvkoikarpfess.ddns.net/api/v1/commentaire?ressource_id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(
          "Échec lors de la récupération des commentaires mis à jour"
        );
        return [];
      }
    } catch (error) {
      console.error(
        "Échec lors de la récupération des commentaires mis à jour:",
        error
      );
      return [];
    }
  };

  return (
    <>
      <Head>
        <title>(RE)ssource - {ressource && ressource.ressource_titre}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <NavbarComponent />
      <div className={style.container}>
        {ressource && (
          <ul>
            <div className={style.avatarName}>
              <img
                src={`https://famdev.srvkoikarpfess.ddns.net/api/v1/images?image=${ressource.t_utilisateur.t_profil.profil_photo}`}
              />
              <li>
                {ressource.t_utilisateur.utilisateur_prenom} <span> </span>
                {ressource.t_utilisateur.utilisateur_nom}
                <li className={style.ressourceDate}>
                  Posté le {formatDate(ressource.ressource_date)}
                </li>
              </li>
            </div>
            <h1 className={style.ressourceTitle}>
              {ressource.ressource_titre}
            </h1>
            <img
              className={style.imgRessource}
              src={`https://famdev.srvkoikarpfess.ddns.net/api/v1/images?image=${ressource.ressource_media}`}
              alt="Ressource Media"
            />
            <div className={style.ressource_contenu}>
              {ressource.ressource_contenu}
            </div>
            <div className={style.interraction}>
              <span className="material-symbols-outlined">visibility</span>
              {ressource.ressource_nombre_de_vues}
              <span className="material-symbols-outlined">favorite</span>
              {ressource.nbLikes}
              <span className="material-symbols-outlined">chat</span>
              {ressource.nbCommentaire}
            </div>
            <div className={style.detailRessource}>
              <li>Visibilité : {ressource.ressource_visibilite}</li>
              <li>Catégorie : {ressource.t_categories.nom_categorie}</li>
            </div>
            <h2>Commentaires :</h2>
            {commentaires.map((commentaire) => (
              <div
                key={commentaire.commentaire_id}
                className={style.commentaire}
              >
                <p>
                  <strong>
                    <img
                      src={`https://famdev.srvkoikarpfess.ddns.net/api/v1/images?image=${commentaire.t_utilisateur.t_profil.profil_photo}`}
                      className={style.avatarCommentaire}
                    />
                    {commentaire.t_utilisateur.utilisateur_prenom}{" "}
                    {commentaire.t_utilisateur.utilisateur_nom}{" "}
                  </strong>
                  : {commentaire.commentaire_texte}
                </p>
                <p>
                  Il y a{" "}
                  {calculateElapsedTime(
                    commentaire.commentaire_date_publication
                  )}{" "}
                  jour
                  {calculateElapsedTime(
                    commentaire.commentaire_date_publication
                  ) > 1
                    ? "s"
                    : ""}
                </p>
              </div>
            ))}
            <NouveauCommentaireForm
              onSubmit={handleSubmit}
              resourceId={parseInt(id)}
            />
          </ul>
        )}
      </div>
    </>
  );
}
