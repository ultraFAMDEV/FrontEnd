import styles from "@/styles/components/InscriptionAccount.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ComponentInscriptionSuite from "@/components/inscription/suiteCreateAccount";

export default function ComponentInscription() {
  const [step, setStep] = useState(1); // État pour suivre l'étape actuelle
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleNext = async () => {
    // Si c'est la deuxième étape, appeler l'API pour créer le compte
    if (step === 2) {
      try {
        const response = await fetch(
          "http://localhost:3001/api/endpoints/createaccountEND",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          // Le compte a été créé avec succès
          console.log("Compte créé avec succès:", result);
        } else {
          // Il y a eu une erreur lors de la création du compte
          console.error("Erreur lors de la création du compte:", result);
        }
      } catch (error) {
        console.error("Erreur lors de la communication avec l'API:", error);
      }
    }

    // Passer à l'étape suivante
    setStep(step + 1);
  };

  const handlePrev = () => {
    // Revenir à l'étape précédente
    setStep(step - 1);
  };

  // Gérer les changements des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <>
      {/* METAHEAD */}
      <Head>
        <title>REssources | Inscription</title>
      </Head>

      {/* BODY */}
      <main className={styles.main}>
        <img className={styles.imgLeft} src="/Components/ActionsAccount.png" />
        <div className={styles.form}>
          <img className={styles.logoInscription} src="/Logo_RE.png" />
          <Link className={styles.linkConnexion} href="/connexion">
            Vous êtes déjà inscrit ? Connectez-vous !
          </Link>

          {/* Bouton "Retour" */}
          <div
            className={styles.button}
            onClick={handlePrev}
            style={{ display: step === 1 ? "none" : "block" }}
          >
            Retour
          </div>

          {step === 1 && (
            <>
              {/* Première étape du formulaire */}
              <p className={styles.inscription}>Inscription</p>
              <label>
                <input
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  placeholder="Nom d'utilisateur"
                />
              </label>
              <label>
                <input
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Mot de passe"
                />
              </label>
            </>
          )}

          {step === 2 && <ComponentInscriptionSuite />}

          <div className={styles.button} onClick={handleNext}>
            {step === 1 ? "Suivant" : "Créer mon profil"}
          </div>

          <Link className={styles.linkCancel} href="/">
            Annuler, revenir à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}
