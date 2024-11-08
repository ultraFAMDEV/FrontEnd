import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "@/styles/components/ressources/Ressources.module.css";
import Link from "next/link";

export default function AllRessourcesComponents() {
  const [ressources, setRessources] = useState([]);
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/ressources`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRessources(data);
        } else {
          console.error("Échec lors de la récupération des ressources");
        }
      } catch (error) {
        console.error("Échec lors de la récupération des ressources:", error);
      }
    };

    fetchRessources();
  }, []);

  return (
    <>
      <Head>
        <title>Accueil</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className={style.container}>
        {ressources.map((ressource, index) => (
          <ul key={index} className={style.ressources}>
            <div className={style.card}>
              <div className={style.avatarContainer}>
                <img
                  src={`${API_ENDPOINT}/images?image=${ressource.t_utilisateur.t_profil.profil_photo}`}
                  className={style.avatar}
                />
                <div>
                  <li>
                    {ressource.t_utilisateur.utilisateur_prenom} <span> </span>
                    {ressource.t_utilisateur.utilisateur_nom}
                  </li>
                  <h1 className={style.ressourceTitle}>
                    {ressource.ressource_titre}
                  </h1>
                </div>
              </div>
              <div className={style.content}>
                <img
                  className={style.ressourceMedia}
                  src={`${API_ENDPOINT}/images?image=${ressource.ressource_media}`}
                />
                <div className={style.resourceActions}>
                  <Link
                    href={`/ressources/${ressource.ressource_id}`}
                    className={style.discover}
                  >
                    Consulter la ressource
                  </Link>
                  <div className={style.interraction}>
                    <li>
                      <span class="material-symbols-outlined">visibility</span>
                      {ressource.ressource_nombre_de_vues}
                    </li>
                    <li>
                      <span className="material-symbols-outlined">
                        favorite
                      </span>
                      {ressource.nbLikes}
                    </li>
                    <li>
                      <span className="material-symbols-outlined">chat</span>
                      {ressource.nbCommentaire}
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
}
