import {useEffect, useState} from "react";
import styles from "@/styles/components/UpdateProfile.module.css";
import {redirect} from "next/navigation";

function getCookie(name) {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(name + '=')) {
			return cookie.substring(name.length + 1);
		}
	}
	return null;
}

export default function UpdateProfileForm({
	user
		 }){

	useEffect(() => {
		setToken(localStorage.getItem("token"))

		const getUser = async () => {
			const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT +  "users?id=" + getCookie('userId');

			const res = await fetch(endpoint, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + token
				}
			});
			const user = await res.json();
			console.log(user);
			return user;
		};
		// getUser()

	}, []);

	const [token, setToken] = useState('')
	const [userId, setUserId] = useState('')

	const [dateNaissance, setDateNaissance] = useState(user.utilisateur_datenaissance)
	const [codePostal, setCodePostal] = useState(user.utilisateur_code_postal)
	const [prenom, setPrenom] = useState(user.utilisateur_prenom)
	const [nom, setNom] = useState(user.utilisateur_nom)
	const [numRue, setNumRue] = useState(user.utilisateur_numero_rue)
	const [ville, setVille] = useState(user.utilisateur_ville)
	const [pays, setPays] = useState(user.utilisateur_pays)
	const [rue, setRue] = useState(user.utilisateur_rue)

	const [message, setMessage]= useState('')

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

		const res = await fetch(process.env.API_ENDPOINT + "/users" + userId, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: "bearer" + token
			},
			body: JSON.stringify(data)
		})

		if (res.ok) {
			setMessage('Mise à jour avec succès.')
		} else {
			setMessage('Erreur lors de la mise à jour.')
			//TODO gestion erreur
		}
	}

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.titre}>Mon profil</h1>
			{message && <p>{message}</p>}
			<p></p>
			<form onSubmit={handleSubmit}>

				<label htmlFor="nom">Nom</label>
				<input type="text" id="nom" name="nom" required defaultValue={nom}  className={styles.input}/>

				<label htmlFor="prenom">prenom</label>
				<input type="text" id="prenom" name="prenom" required defaultValue={user.utilisateur_prenom}  className={styles.input}/>

				<label htmlFor="datenaissance">datenaissance</label>
				<input type="text" id="datenaissance" name="datenaissance" required defaultValue={dateNaissance}  className={styles.input}/>

				<label htmlFor="ville">ville</label>
				<input type="text" id="ville" name="ville" required defaultValue={ville}  className={styles.input}/>

				<label htmlFor="codepostal">codepostal</label>
				<input type="text" id="codepostal" name="codepostal" required defaultValue={codePostal}  className={styles.input}/>

				<label htmlFor="numerorue">numerorue</label>
				<input type="text" id="numerorue" name="numerorue" required defaultValue={numRue}  className={styles.input}/>

				<label htmlFor="rue">rue</label>
				<input type="text" id="rue" name="rue" required defaultValue={rue}  className={styles.input}/>

				<label htmlFor="pays ">pays</label>
				<input type="text" id="pays " name="pays " required defaultValue={pays}  className={styles.input}/>

				<button type="submit">
					Metre à jour
				</button>

			</form>
		</div>
	);
}