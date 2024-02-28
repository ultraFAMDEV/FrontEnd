import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Head from "next/head";

export default function ProfilComponent() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Aucun token trouvé");
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

  return (
    <>
      <Head>{user && <title>{user.utilisateur_prenom}</title>}</Head>
      <div>
        {error ? (
          <p>{error}</p>
        ) : user ? (
          <>
            <h1>{user.utilisateur_prenom}</h1>
            <p>{user.t_profil.profil_description}</p>
            <p>Nombre d'abonnements : {user.t_profil.profil_nbabonnement}</p>
            <p>Nombres de ressources : {user.t_profil.profil_creations}</p>
          </>
        ) : (
          <p>Chargement de vos informations</p>
        )}
      </div>
    </>
  );
}
