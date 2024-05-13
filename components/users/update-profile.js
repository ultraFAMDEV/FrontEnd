import {useEffect, useState} from "react";
import styles from "@/styles/components/UpdateProfile.module.css";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function UpdateProfileForm({
	user
		 }){

	useEffect(() => {
		setToken(localStorage.getItem("token"))
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault()

		const data = {
			"utilisateur_datenaissance": dateNaissance,
			"utilisateur_code_postal": codePostal,
			"utilisateur_numero_rue": numRue,
			"utilisateur_prenom": prenom,
			"utilisateur_ville": ville,
			"utilisateur_pays": pays,
			"utilisateur_nom": nom,
			"utilisateur_rue": rue
		}

		const res = await fetch(process.env.API_ENDPOINT + "/users", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer" + token
			},
			body: JSON.stringify(data)
		})
	}

	const [dateNaissance, setDateNaissance] = useState(user.datenaissance)
	const [codePostal, setCodePostal] = useState(user.codepostal)
	const [prenom, setPrenom] = useState(user.utilisateur_prenom)
	const [nom, setNom] = useState(user. utilisateur_nom)
	const [numRue, setNumRue] = useState(user.numerorue)
	const [ville, setVille] = useState(user.ville)
	const [pays, setPays] = useState(user.pays)
	const [rue, setRue] = useState(user.rue)
	const [token, setToken] = useState('')

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.titre}>Mon profil</h1>
			<form onSubmit={handleSubmit}>

				<label htmlFor="nom">Nom</label>
				<input type="text" id="nom" name="nom" required value={nom} className={styles.input}/>

				<label htmlFor="prenom">prenom</label>
				<input type="text" id="prenom" name="prenom" required value={prenom} className={styles.input}/>

				<label htmlFor="datenaissance">datenaissance</label>
				<input type="text" id="datenaissance" name="datenaissance" required value={dateNaissance} className={styles.input}/>

				<label htmlFor="ville">ville</label>
				<input type="text" id="ville" name="ville" required value={ville} className={styles.input}/>

				<label htmlFor="codepostal">codepostal</label>
				<input type="text" id="codepostal" name="codepostal" required value={codePostal} className={styles.input}/>

				<label htmlFor="numerorue">numerorue</label>
				<input type="text" id="numerorue" name="numerorue" required value={numRue} className={styles.input}/>

				<label htmlFor="rue">rue</label>
				<input type="text" id="rue" name="rue" required value={rue} className={styles.input}/>

				<label htmlFor="pays ">pays</label>
				<input type="text" id="pays " name="pays " required value={pays} className={styles.input}/>

				<button type="submit">
					Metre à jour
				</button>

				<p aria-live="polite" role="status">
					{/*{state?.message}*/}
				</p>
			</form>
		</div>
	);
}