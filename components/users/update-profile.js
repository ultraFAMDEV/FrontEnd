// "use client";

import { useState} from "react";

const initialState = {
	message: "",
};

export default function UpdateProfileForm({
	user
		 }){
	console.log(user)

	const [nom, setNom] = useState(user. utilisateur_nom)
	const [prenom, setPrenom] = useState(user.utilisateur_prenom)
	const [dateNaissance, setDateNaissance] = useState(user.datenaissance)
	const [ville, setVille] = useState(user.ville)
	const [codePostal, setCodePostal] = useState(user.codepostal)
	const [numRue, setNumRue] = useState(user.numerorue)
	const [rue, setRue] = useState(user.rue)
	const [pays, setPays] = useState(user.pays)

	return (
		<form action={updateProfilApi}>
			<label htmlFor="nom">Nom</label>
			<input type="text" id="nom" name="nom" required value={nom}/>

			<label htmlFor="prenom"> prenom </label>
			<input type="text" id="prenom" name="prenom" required value={prenom}/>

			<label htmlFor="datenaissance">datenaissance</label>
			<input type="text" id="datenaissance" name="datenaissance" required value={dateNaissance}/>

			<label htmlFor="ville">ville</label>
			<input type="text" id="ville" name="ville" required value={ville}/>

			<label htmlFor="codepostal">codepostal</label>
			<input type="text" id="codepostal" name="codepostal" required value={codePostal}/>

			<label htmlFor="numerorue">numerorue</label>
			<input type="text" id="numerorue" name="numerorue" required value={numRue}/>

			<label htmlFor="rue">rue</label>
			<input type="text" id="rue" name="rue" required value={rue}/>

			<label htmlFor="pays ">pays</label>
			<input type="text" id="pays " name="pays " required value={pays}/>

			<button type="submit">
				Metre à jour
			</button>

			<p aria-live="polite" role="status">
				{/*{state?.message}*/}
			</p>
		</form>
	);
}