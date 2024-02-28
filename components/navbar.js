import { useState, useEffect } from "react";
import Link from "next/link";
import DeconnexionAccount from "@/components/users/deconnexionAccount";

export default function NavbarComponent() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est connecté au chargement initial
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    setLoggedIn(false); // Mettre à jour l'état de connexion
  };

  // Fonction pour gérer la connexion
  const handleLogin = () => {
    setLoggedIn(true); // Mettre à jour l'état de connexion
  };

  return (
    <>
      <nav>
        <ul>
          {loggedIn ? (
            <>
              <li>
                <Link href="/profil">Profil</Link>
              </li>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <DeconnexionAccount onLogout={handleLogout} />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/">Accueil</Link>
              </li>
              <li>
                <Link href="/connexion">Connexion</Link>
              </li>
              <li>
                <Link href="/inscription">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
