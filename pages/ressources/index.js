import NavbarComponent from "@/components/navbarComponent";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "@/styles/components/ressources/Recherche.module.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://famdev.srvkoikarpfess.ddns.net/api/v1/categorie",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Échec lors de la récupération des ressources");
        }
      } catch (error) {
        console.error("Échec lors de la récupération des ressources:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Head>
        <title>(RE)ssources | Recherche</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Head>
      <div className={style.categoriesContainer}>
        {categories.map((category, index) => (
          <div key={index} className={style.categoryCard}>
            <p className={style.nomRessource}>{category.nom_categorie}</p>
            <p className={style.nbRessources}>{category.nbRessources}</p>
          </div>
        ))}
      </div>
    </>
  );
}
