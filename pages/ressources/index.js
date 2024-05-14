import React, { useState, useEffect } from "react";
import Head from "next/head";
import style from "@/styles/components/ressources/Recherche.module.css";
import NavbarComponent from "@/components/navbarComponent";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    const searchRessources = async () => {
      try {
        const response = await fetch(
          `https://famdev.srvkoikarpfess.ddns.net/api/v1/searchRessource?recherche=${searchValue}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Échec lors de la recherche des ressources");
        }
      } catch (error) {
        console.error("Échec lors de la recherche des ressources:", error);
      }
    };

    if (searchValue) {
      searchRessources();
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

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
        <input
          type="text"
          placeholder="Chercher une ressource"
          value={searchValue}
          onChange={handleSearchChange}
          className={style.searchInput}
        />
        {searchResults.length > 0 ? (
          <div className={style.searchResults}>
            {searchResults.map((resource, index) => (
              <div key={index} className={style.searchResultItem}>
                <p>{resource.titre}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {categories.map((category, index) => (
              <Link href={`/ressources/categories/${category.id_categorie}`}>
                <div key={index} className={style.categoryCard}>
                  {/* Utilisez Link pour créer des liens dynamiques */}
                  <a className={style.nomRessource}>{category.nom_categorie}</a>

                  <p className={style.nbRessources}>
                    {category.nbRessources} ressources
                  </p>
                  <div className={style.resources}>
                    {category.ressources &&
                      category.ressources.map((resource, index) => (
                        <div key={index} className={style.resourceItem}>
                          <p>{resource.titre}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
