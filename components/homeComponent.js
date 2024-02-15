import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const handleRessources = async () => {
      try {
        const response = await fetch(
          "https://famdev.srvkoikarpfess.ddns.net/api/endpoints/getressourceEND",
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

    handleRessources(); // Appeler la fonction au chargement de la page
  }, []); // Utiliser un tableau vide pour n'exécuter qu'une seule fois

  return (
    <>
      <Head>
        <title>Accueil</title>
      </Head>
      <ul>
        {ressources.map((resource, index) => (
          <>
            <li key={index}>{resource.ressource_titre}</li>
            <li key={index}>{resource.ressource_contenu}</li>
          </>
        ))}
      </ul>
    </>
  );
}
