import React from "react";
import style from "@/styles/components/Navbar.module.css";

export default function DeconnexionAccountComponent({
  onLogout,
  redirectToHome,
}) {
  const handleLogout = () => {
    onLogout();
    redirectToHome();
  };

  return (
    <button onClick={handleLogout} className={style.boutonDeconnexion}>
      Déconnexion
    </button>
  );
}
