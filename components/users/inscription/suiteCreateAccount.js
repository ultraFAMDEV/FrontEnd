import styles from "@/styles/components/InscriptionAccount.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import ComponentInscriptionSuite from "@/components/users/inscription/suiteCreateAccount";

export default function ComponentInscriptionSuite() {
  const [userData, setUserData] = useState({
    email: "",
    function: "",
    civility: "homme",
  });

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
        <title>REssources | Inscription - Profil</title>
      </Head>
      {/* BODY */}
      <main className={styles.main}>
        <div className={styles.form}>
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
        </div>
        <div className={styles.button} onClick={handleNext}>
          Suivant
        </div>
      </main>
    </>
  );
}
