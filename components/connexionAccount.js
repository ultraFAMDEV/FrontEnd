import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/components/ConnexionAccount.module.css";
import Head from "next/head";
import Link from "next/link";

export default function ComponentConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://famdev.srvkoikarpfess.ddns.net/api/endpoints/loginEND",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        console.log("Connexion réussie !");
        router.push("/");
      } else {
        console.error("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

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
            <input placeholder="Nom d'utilisateur" />
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
          <div className={styles.button}>Se connecter</div>
          <Link className={styles.linkConnexion} href="/">
            Annuler, revenir à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}
