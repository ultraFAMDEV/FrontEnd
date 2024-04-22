import Head from "next/head";
import { useState, useEffect } from "react";
import style from "@/styles/components/RessourcesHome.module.css";
import Link from "next/link";

export default function Home() {
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const handleRessources = async () => {
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

    handleRessources();
  }, []);

  return (
    <>
      <Head>
        <title>Accueil</title>
      </Head>
      <div>
        {ressources.map((resource, index) => (
          <ul key={index} className={style.ressources}>
            <h1 key={index + "_titre"}>{resource.ressource_titre}</h1>
            <li key={index + "_contenu"}>
              Auteur : {resource.t_utilisateur.utilisateur_nom}
            </li>
            <li key={index + "_contenu"}>
              Catégorie : {resource.t_categories.nom_categorie}
            </li>
            <li key={index + "_contenu"}>{resource.ressource_contenu}</li>
            <li key={index + "_media"}>{resource.ressource_media}</li>
            <img src={resource.ressource_media}></img>
          </ul>
        ))}
      </div>
    </>
  );
}
