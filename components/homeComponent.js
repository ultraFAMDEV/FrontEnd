import Head from "next/head";
import { useState, useEffect } from "react";
import AllRessourcesComponents from "./ressources/allRessourcesComponent";
import NavbarComponent from "./navbarComponent";

export default function Home() {
  return (
    <>
      <AllRessourcesComponents />;
    </>
  );
}
