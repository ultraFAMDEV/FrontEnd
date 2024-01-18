import styles from "@/styles/components/connexionAccount.module.css";
import Head from "next/head";
import Link from "next/link";

export default function ComponentConnexion() {
  return (
    <>
      {/*  Metadata */}
      <Head>
        <title>REssources | Connexion</title>
      </Head>

      {/*  Body */}
      <main className={styles.main}>
        <img className={styles.imgLeft} src="/Components/ActionsAccount.png" />
        <div className={styles.form}>
          <img className={styles.logoConnexion} src="/Logo_RE.png" />
          <p className={styles.connexion}>Connexion</p>
          <label>
            <input placeholder="Nom d'utilisateur" />
          </label>
          <label>
            <input type="password" placeholder="Mot de passe" />
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <div className={styles.button}>Se connecter</div>
          <Link className={styles.linkConnexion} href="/">
            Annuler, revenir à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}
