import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Head from "next/head";
import { useRouter } from "next/router";

export default function ProfilComponent() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fonction pour formater la date au format "jour mois année"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/connexion");
          return;
        }

        const decodedToken = jwt.decode(token);
        const userId = decodedToken.id;
        const response = await fetch(
          `https://famdev.srvkoikarpfess.ddns.net/api/endpoints/users?id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setError(
            "Erreur lors de la récupération des informations de l'utilisateur"
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur:",
          error
        );
        setError(
          "Erreur lors de la récupération des informations de l'utilisateur"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <Head>{user && <title>{user.utilisateur_prenom}</title>}</Head>
      <div>
        {error ? (
          <p>{error}</p>
        ) : user ? (
          <>
            <p>Nom : {user.utilisateur_nom}</p>
            <p>Prénom : {user.utilisateur_prenom}</p>
            <p>Rôle : {user.utilisateur_role}</p>
            <p>{user.t_profil.profil_description}</p>
            <p>
              Date de naissance : {formatDate(user.utilisateur_datenaissance)}
            </p>
            <p>Abonnements : {user.t_profil.profil_nbabonnement}</p>
            <p>Ressources : {user.t_profil.profil_creations}</p>
            <p>
              Inscrit depuis le {formatDate(user.utilisateur_dateinscription)}
            </p>
          </>
        ) : (
          <p>Chargement des informations de l'utilisateur...</p>
        )}
      </div>
    </>
  );
}
