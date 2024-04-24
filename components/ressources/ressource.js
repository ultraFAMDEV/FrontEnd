import styles from "@/styles/components/ressource.module.css";

export default function Ressource(props) {
	return (
		<div className={styles.background}>
			<h3>{props.ressource.ressource_titre}</h3>
			<p>{props.ressource.ressource_contenu}</p>
		</div>
	);
}