import React from 'react'
import styles from "@/styles/components/Utilisateur.module.css";
import { useRouter } from 'next/router'

export async function  getServerSideProps({ query }) {
  const endpoint = 'https://famdev.srvkoikarpfess.ddns.net/api/endpoints/getuser?id=' + query.id;
  console.log(endpoint);
  const res = await fetch(endpoint);
  const user = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      user
    },

  }
}

export default function Page({ user })
{
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.middle}>

          <div className={styles.banner}>
            {user.utilisateur_nom} {user.utilisateur_prenom}
          </div>

          <div className={styles.headerImages}>
            {/*<img src="https://res.cloudinary.com/dowrygm9b/image/upload/v1570267399/laptop-3174729_yiprzu.jpg" alt="banniere" id="profileHeader"/>*/}
            {/*<img src="https://res.cloudinary.com/dowrygm9b/image/upload/v1570267399/laptop-3174729_yiprzu.jpg" alt="photo de profil" id="profilePicture"/>*/}
          </div>

          <div className={styles.bio}>
            <span> <i className="fa fa-birthday-cake" aria-hidden="true"></i> née le {user.utilisateur_datenaissance}</span>
            <br/> <span><i className="fa fa-calendar"></i> Inscrit depuis {user.utilisateur_dateinscription}</span>

          </div>
        </div>
      </div>
    </div>
  );
}
