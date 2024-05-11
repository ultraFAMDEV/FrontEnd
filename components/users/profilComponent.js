import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "@/styles/components/Profil.module.css";
import Link from "next/link";

export default function ProfilComponent() {
  const [user, setUser] = useState(null);
  const [ressources, setRessources] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null); // Ajout de l'état local userId
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
        setUserId(userId); // Mettre à jour l'état local userId

        // Récupération des informations de l'utilisateur
        const userResponse = await fetch(
          `https://famdev.srvkoikarpfess.ddns.net/api/v1/users?id=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);

          // Récupération des ressources de l'utilisateur actuel
          const ressourcesResponse = await fetch(
            `https://famdev.srvkoikarpfess.ddns.net/api/v1/ressources?id_utilisateur=${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (ressourcesResponse.ok) {
            const ressourcesData = await ressourcesResponse.json();
            setRessources(ressourcesData);
          } else {
            setError(
              "Erreur lors de la récupération des ressources de l'utilisateur"
            );
          }
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
      <Head>
        {user && (
          <title>
            (RE)ssource - {user.utilisateur_prenom} {user.utilisateur_nom}
          </title>
        )}
      </Head>
      <div className={style.container}>
        {error ? (
          <p>{error}</p>
        ) : user ? (
          <>
            <img src="/boy.png" className={style.avatar} />
            <p className={style.name}>
              {user.utilisateur_prenom} {""}
              {user.utilisateur_nom}
            </p>
            <p className={style.description}>
              {user.t_profil.profil_description}
            </p>
            <p>
              Abonnements : {user.t_profil.profil_nbabonnement} Créations :{" "}
              {user.t_profil.profil_creations}
            </p>
            <p>
              Inscrit depuis le {formatDate(user.utilisateur_dateinscription)}
            </p>
            <h2>Ressources de l'utilisateur :</h2>
            {ressources.map(
              (ressource) =>
                // Vérifier si l'ID de l'utilisateur de la ressource correspond à l'ID de l'utilisateur connecté
                ressource.id_utilisateur === userId && (
                  <div key={ressource.ressource_id}>
                    <Link href={`/ressources/${ressource.ressource_id}`}>
                      {ressource.ressource_titre}
                    </Link>
                  </div>
                )
            )}
          </>
        ) : (
          <p>Chargement des informations de l'utilisateur...</p>
        )}
      </div>
    </>
  );
}
