import NavbarComponent from "@/components/navbarComponent";
import UpdateProfilForm from "@/components/users/update-profile";

export async function  getServerSideProps({ query }) {
	const res = await fetch(process.env.API_ENDPOINT + 'users?id=' + query.id);
	const user = await res.json()

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