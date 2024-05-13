import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/components/InscriptionAccount.module.css";
import Head from "next/head";
import Link from "next/link";

export default function InscriptionPage() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    civility: "homme",
    birthdate: "",
    username: "",
    function: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      router.push("/");
    }
  }, []);

  const handleNext = async () => {
    if (step === 1) {
      if (userData.password !== userData.confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas.");
        return;
      }
    }

    if (step === 2) {
      try {
        console.log("Data being sent to API:", userData);

        const formData = new FormData();
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("nom", userData.username);
        formData.append("prenom", userData.function);
        formData.append("datenaissance", userData.birthdate);

        const response = await fetch(
          "https://famdev.srvkoikarpfess.ddns.net/api/v1/users",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwibWFpbCI6ImFwcG9sbG9AZ21haWwuY29tIiwiaWRfdXNlciI6MywiaWF0IjoxNzE1NTgzMzcyLCJleHAiOjE3NDcxMTkzNzJ9.KZm90nqrqESMEPqK8qHRKeSpBkudRv2qedfwQX8V4d4",
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          localStorage.setItem("token", result.token);
          setSuccessMessage("Compte créé avec succès");
          router.push("/");
        } else {
          setErrorMessage("Erreur lors de la création du compte");
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
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  placeholder="Adresse mail"
                  type="email"
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
              <label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirmer le mot de passe"
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
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  placeholder="Nom"
                />
              </label>
              <label>
                <input
                  type="text"
                  name="function"
                  value={userData.function}
                  onChange={handleInputChange}
                  placeholder="Prénom"
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
              {/* Champ pour la date de naissance */}
              <label>
                <input
                  type="date"
                  name="birthdate"
                  value={userData.birthdate}
                  onChange={handleInputChange}
                  placeholder="Date de naissance"
                />
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
