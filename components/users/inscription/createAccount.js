import styles from "@/styles/components/InscriptionAccount.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function InscriptionPage() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    function: "",
    civility: "homme",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleNext = async () => {
    if (step === 2) {
      try {
        const response = await fetch(
          "https://famdev.srvkoikarpfess.ddns.net/api/endpoints/users",
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
          setSuccessMessage("Compte créé avec succès");
          console.log("Compte créé avec succès:", result);
        } else {
          setErrorMessage("Erreur lors de la création du compte");
          console.error("Erreur lors de la création du compte:", result);
        }
      } catch (error) {
        console.error("Erreur lors de la communication avec l'API:", error);
      }
    }

    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

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
          {step === 2 && (
            <>
              {/* Deuxième étape du formulaire */}
              <p className={styles.inscription}>Compléter mon profil</p>
              <label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Adresse mail"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="function"
                  value={userData.function}
                  onChange={handleInputChange}
                  placeholder="Fonction"
                />
              </label>
              <label>
                <select
                  id="civility"
                  name="civility"
                  className={styles.civilite}
                  value={userData.civility}
                  onChange={handleInputChange}
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="non-genre">Non genré</option>
                </select>
              </label>
            </>
          )}
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}{" "}
          {successMessage && <p className={styles.success}>{successMessage}</p>}{" "}
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
