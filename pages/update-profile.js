import { useState, useEffect } from "react";
import HomeComponent from "@/components/homeComponent";
import NavbarComponent from "@/components/navbarComponent";
import UpdateProfilForm from "@/components/users/update-profile";

export async function  getServerSideProps({ query }) {
	const res = await fetch(process.env.API_ENDPOINT + 'users?id=' + query.id);
	const user = await res.json()

	console.clear()
	console.log('Page Compo')
	// console.log(user)
	return {
		props: {
			user
		},
	}
}

export default function UpdateProfilePage ({user}) {
	return(
		<>
			<NavbarComponent />
			<UpdateProfilForm user={user}/>
		</>

	)
};