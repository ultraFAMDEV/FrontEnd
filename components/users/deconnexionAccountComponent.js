import React from "react";

export default function DeconnexionAccountComponent({
  onLogout,
  redirectToHome,
}) {
  const handleLogout = () => {
    onLogout();
    redirectToHome();
  };

  return <button onClick={handleLogout}>Déconnexion</button>;
}
