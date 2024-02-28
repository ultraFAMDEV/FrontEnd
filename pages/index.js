import { useState, useEffect } from "react";
import HomeComponent from "@/components/homeComponent";
import NavbarComponent from "@/components/navbarComponent";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <nav>
        <NavbarComponent />
      </nav>
      <main>
        <HomeComponent />
      </main>
    </>
  );
}
