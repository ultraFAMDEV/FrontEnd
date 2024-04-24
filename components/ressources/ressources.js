import styles from "@/styles/components/ressource.module.css";
import Ressource from "@/components/ressources/ressource";

export default function Ressources(props) {
	return (
		<div>
		{
			props.ressources.map(
				ressource => <Ressource key={ressource.ressource_id} ressource={ressource}></Ressource>
			)
		}
		</div>
	);
}