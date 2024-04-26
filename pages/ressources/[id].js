import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/components/ressources/Ressource.module.css";
import Link from "next/link";
import NavbarComponent from "@/components/navbarComponent";

export default function Ressource() {
  const router = useRouter();
  const { id } = router.query;

  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const response = await fetch(
          `https://famdev.srvkoikarpfess.ddns.net/api/endpoints/ressources?id=${id}`,
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

    if (id) {
      // Vérification si l'ID est défini avant de faire la requête
      fetchRessources();
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>(RE)ssource - {ressources.ressource_titre}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div>
        <NavbarComponent />
        <div className={style.container}>
          {ressources.map((ressource, index) => (
            <ul key={index}>
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
                src={`https://famdev.srvkoikarpfess.ddns.net/api/endpoints/images?image=${ressource.ressource_media}`}
                alt="Ressource Media"
              />
              <div>{ressource.ressource_contenu}</div>
              <div className={style.interraction}>
                <li>
                  <span class="material-symbols-outlined">visibility</span>
                  {ressource.ressource_nombre_de_vues}
                </li>
                <li>
                  <span className="material-symbols-outlined">favorite</span>
                  {ressource.nbLikes}
                </li>
                <li>
                  <span className="material-symbols-outlined">chat</span>3
                </li>
              </div>
              <div className={style.detailRessource}>
                <li>Visibilié : {ressource.ressource_visibilite}</li>
                <li>Catégorie : {ressource.t_categories.nom_categorie}</li>
              </div>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
