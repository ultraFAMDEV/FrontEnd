import { useState, useEffect } from "react";
import Link from "next/link";
import DeconnexionAccount from "@/components/users/deconnexionAccount";

export default function NavbarComponent() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
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
