import Head from "next/head";
import { useState, useEffect } from "react";

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
        {ressources.map((resource) => (
          <ul key={resource.id}>
            <li>{resource.ressource_titre}</li>
            <li>{resource.ressource_contenu}</li>
            <li>{resource.ressource_media}</li>
          </ul>
        ))}
      </div>
    </>
  );
}
