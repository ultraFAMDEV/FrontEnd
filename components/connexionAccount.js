import styles from "@/styles/components/ConnexionAccount.module.css";
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
          <Link className={styles.linkInscription} href="/inscription">
            Pas encore inscrit ? Inscrivez-vous !
          </Link>
          <p className={styles.connexion}>Connexion</p>
          <label>
            <input
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className={styles.checkbox}>
            <input type="checkbox" />
            Se souvenir de moi
          </label>
          <div className={styles.button} onClick={handleLogin}>
            Se connecter
          </div>
          <Link className={styles.linkConnexion} href="/">
            Annuler, revenir à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}
