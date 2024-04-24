import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "@/styles/components/Ressources.module.css";
import Link from "next/link";

export default function AllRessourcesComponents() {
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const response = await fetch(
          "https://famdev.srvkoikarpfess.ddns.net/api/endpoints/ressources",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
              <div className={style.avatar}>
                <img src="/boy.png" />
              </div>
              <div className={style.content}>
                <li>
                  {ressource.t_utilisateur.utilisateur_prenom} <span> </span>
                  {ressource.t_utilisateur.utilisateur_nom}
                </li>
                <h1>{ressource.ressource_titre}</h1>
                <img
                  src={`https://famdev.srvkoikarpfess.ddns.net/api/endpoints/images?image=${ressource.ressource_media}`}
                />
                <br></br>
                <Link
                  href={`/ressources/${ressource.ressource_id}`}
                  className={style.discover}
                >
                  Consulter la ressource
                </Link>
                <div className={style.interraction}>
                  <li>
                    <span class="material-symbols-outlined">favorite</span>
                    {ressource.nbLikes}
                  </li>
                  <li>
                    <span class="material-symbols-outlined">chat</span>3
                  </li>
                </div>
              </div>
            </div>
          </ul>
        ))}
      </div>
    </>
  );
}
