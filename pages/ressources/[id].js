import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Ressource({ ressource }) {
  const {
    ressource_titre,
    ressource_contenu,
    ressource_media,
    t_utilisateur,
    t_categories,
  } = ressource;

  // Vérifier si t_utilisateur est défini, sinon, définir utilisateurNom à "Utilisateur inconnu"
  const utilisateurNom = t_utilisateur
    ? t_utilisateur.utilisateur_nom
    : "Utilisateur inconnu";
  // Vérifier si t_categories est défini, sinon, définir categorieNom à "Catégorie inconnue"
  const categorieNom = t_categories
    ? t_categories.nom_categorie
    : "Catégorie inconnue";

  return (
    <>
      <Head>
        <title>{ressource_titre}</title>
      </Head>
      <div>
        <h1>{ressource_titre}</h1>
        <p>Auteur: {utilisateurNom}</p>
        <p>Catégorie: {categorieNom}</p>
        <p>{ressource_contenu}</p>
        <img
          src={`https://famdev.srvkoikarpfess.ddns.net/api/endpoints/images?image=${ressource_media}`}
        />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
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
      const ressource = await response.json();
      return {
        props: { ressource },
      };
    } else {
      console.error("Failed to fetch resource data");
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching resource data:", error);
    return {
      notFound: true,
    };
  }
}
