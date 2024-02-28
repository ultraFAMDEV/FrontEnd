import { useState } from "react";

export default function DeconnexionAccount({ onLogout }) {
  const [message, setMessage] = useState("");

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setMessage("Déconnexion réussie");
      onLogout();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      setMessage("Erreur lors de la déconnexion");
    }
  };

  return <span onClick={handleLogout}>Déconnexion</span>;
}
