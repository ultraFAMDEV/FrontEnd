import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DeconnexionAccount from "@/components/users/deconnexionAccountComponent";
import style from "@/styles/components/Navbar.module.css";
import NewRessource from "./ressources/newRessourcesCompoenent";

export default function NavbarComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const redirectToHome = () => {
    router.push("/");
  };

  return (
    <>
      <nav>
        <ul className={style.navbar}>
          {loggedIn ? (
            <>
              <li>
                <div>
                  <Link href="/">Accueil</Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/ressources">Rechercher</Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/profil">Profil</Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/ressources/newressource">Poster</Link>
                </div>
              </li>
              <li>
                <div>
                  <DeconnexionAccount
                    onLogout={handleLogout}
                    redirectToHome={redirectToHome}
                  />
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <div>
                  <Link href="/connexion">Connexion</Link>
                </div>
              </li>
              <li>
                <div>
                  <Link href="/inscription">Inscription</Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
