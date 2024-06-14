import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "@/styles/components/ressources/Ressources.module.css";
import Link from "next/link";
import NavbarComponent from "@/components/navbarComponent";

export default function AllRessourcesComponents() {
  const [category, setCategory] = useState({});
  const [ressources, setRessources] = useState([]);
  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

  useEffect(() => {
    const categoryId = window.location.pathname.split("/").pop();

    const fetchCategoryAndRessources = async () => {
      try {
        const categoryResponse = await fetch(
          `${API_ENDPOINT}/categorie?id=${categoryId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategory(categoryData);
          setRessources(categoryData.t_ressource);
        } else {
          console.error(
            "Échec lors de la récupération des informations sur la catégorie"
          );
        }
      } catch (error) {
        console.error(
          "Échec lors de la récupération des informations sur la catégorie:",
          error
        );
      }
    };

    fetchCategoryAndRessources();
  }, []);

  return (
    <>
      <Head>
        <title>(RE)ssources {category.nom_categorie}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <NavbarComponent />
      <div className={style.container}>
        <h1>{category.nom_categorie}</h1>
        {ressources.length > 0 ? (
          ressources.map((ressource, index) => (
            <ul key={index} className={style.ressources}>
              <div className={style.card}>
                <div className={style.avatarContainer}>
                  <div>
                    <li>{/* Insérer les informations sur l'utilisateur */}</li>
                    <h1 className={style.ressourceTitle}>
                      {ressource.ressource_titre}
                    </h1>
                  </div>
                </div>
                <div className={style.content}>
                  <div className={style.resourceActions}>
                    <Link
                      href={`/ressources/${ressource.ressource_id}`}
                      className={style.discover}
                    >
                      Consulter la ressource
                    </Link>
                    <div className={style.interraction}>
                      <li>
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                        {ressource.ressource_nombre_de_vues}
                      </li>
                      <li>
                        <span className="material-symbols-outlined">
                          favorite
                        </span>
                        {ressource.nbLikes}
                      </li>
                      {/* Insérer d'autres interactions */}
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          ))
        ) : (
          <p>Aucune ressource disponible pour cette catégorie.</p>
        )}
      </div>
    </>
  );
}
