import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/components/ConnexionAccount.module.css";
import Head from "next/head";
import Link from "next/link";

export default function ComponentConnexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      router.push("/"); // Redirection si un token est déjà stocké
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://famdev.srvkoikarpfess.ddns.net/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Connexion réussie !");
        // Stockage du token dans le localStorage
        localStorage.setItem("token", data.token);
        setToken(data.token);

        document.cookie = 'userId='+ data.user +'; expires=Fri, 31 Dec 9999 23:59:59 GMT';

        router.push("/");
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Erreur lors de la connexion, veuillez réessayer.");
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
          {error && <p className={styles.error}>{error}</p>}
          <label>
            <input
              placeholder="Adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Continuer en tant qu'invité
          </Link>
          <Link className={styles.linkConnexion} href="/">
            Annuler, revenir à l'accueil
          </Link>
        </div>
      </main>
    </>
  );
}
