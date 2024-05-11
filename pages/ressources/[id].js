import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/components/ressources/Ressource.module.css";
import Link from "next/link";
import NavbarComponent from "@/components/navbarComponent";

export default function Ressource() {
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
          setRessource(data[0]); // Set la première ressource trouvée
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
              <img src="/boy.png" />
              <li>
                {ressource.t_utilisateur.utilisateur_prenom} <span> </span>
                {ressource.t_utilisateur.utilisateur_nom}
              </li>
            </div>
            <h1>{ressource.ressource_titre}</h1>
            <img
              className={style.imgRessource}
              src={`https://famdev.srvkoikarpfess.ddns.net/api/v1/images?image=${ressource.ressource_media}`}
              alt="Ressource Media"
            />
            <div>{ressource.ressource_contenu}</div>
            <div className={style.interraction}>
              <span class="material-symbols-outlined">visibility</span>
              {ressource.ressource_nombre_de_vues}
              <span className="material-symbols-outlined">favorite</span>
              {ressource.nbLikes}
              <span className="material-symbols-outlined">chat</span>
              {ressource.nbCommentaire}
            </div>

            <div className={style.detailRessource}>
              <li>Visibilié : {ressource.ressource_visibilite}</li>
              <li>Catégorie : {ressource.t_categories.nom_categorie}</li>
            </div>

            {/* Affichage des commentaires */}
            <h2>Commentaires :</h2>
            {commentaires.map((commentaire) => (
              <div key={commentaire.commentaire_id}>
                <p>
                  <strong>
                    {commentaire.t_utilisateur.utilisateur_prenom}{" "}
                    {commentaire.t_utilisateur.utilisateur_nom}{" "}
                  </strong>
                  : {commentaire.commentaire_texte}
                </p>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
