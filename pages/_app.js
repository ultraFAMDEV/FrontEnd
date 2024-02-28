import "@/styles/globals.css";
import NavbarComponent from "@/components/navbar";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavbarComponent />
      <Component {...pageProps} />
    </div>
  );
}
