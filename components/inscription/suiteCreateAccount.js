import styles from "@/styles/components/InscriptionAccount.module.css";
import Head from "next/head";
import Link from "next/link";

export default function ComponentInscriptionSuite() {
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
            <input type="email" placeholder="Adresse mail" />
          </label>
          <label>
            <input type="text" placeholder="Fonction" />
          </label>
          <label>
            <select id="civility" name="civility" className={styles.civilite}>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
              <option value="non-genre">Non genré</option>
            </select>
          </label>
        </div>
      </main>
    </>
  );
}
