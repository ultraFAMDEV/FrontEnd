import NavbarComponent from "@/components/navbarComponent";
import UpdateProfilForm from "@/components/users/update-profile";

export async function  getServerSideProps(context) {
	const { req } = context;

	if (req.cookies.userId || req.cookies.userId === null
		|| req.cookies.token || req.cookies.token === null
) {
		console.log("problème avec les cookies pour l'id et/ou le token.");
	}

	const res = await fetch(process.env.API_ENDPOINT + 'users?id=' + req.cookies.userId, {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' +req.cookies.token
		}
	});

	const user = await res.json();

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