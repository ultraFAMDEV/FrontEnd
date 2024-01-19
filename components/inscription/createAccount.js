import styles from "@/styles/components/InscriptionAccount.module.css";
import Head from "next/head";
import Link from "next/link";

export default function ComponentInscription() {
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
          <p className={styles.inscription}>Inscription</p>
          <label>
            <input placeholder="Nom d'utilisateur" />
          </label>
          <label>
            <input type="password" placeholder="Mot de passe" />
          </label>
          <p className={styles.inscription}>Date de naissance</p>
          <label>
            <input type="date" />
          </label>
          <div className={styles.button}>Suivant</div>
          <Link className={styles.linkCancel} href="/">
            Annuler, revenir à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}
