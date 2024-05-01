import React from 'react'
import styles from "@/styles/components/Utilisateur.module.css";
import Image from 'next/image'
import Ressources from '@/components/ressources/ressources';

export async function  getServerSideProps({ query }) {
  const endpoint = 'https://famdev.srvkoikarpfess.ddns.net/api/endpoints/users?id=' + query.id;
  const res = await fetch(endpoint);
  const user = await res.json()

  const res2 = await fetch('https://famdev.srvkoikarpfess.ddns.net/api/endpoints/ressources?user_id=' + query.id );
  const ressources = await res2.json();

  return {
    props: {
      user,
      ressources
    },
  }
}

export default function Page({
                               user,
                               ressources
})
{
  return (
      <div className={styles.container}>
        <div className={styles.middle}>
          <div className={styles.headerImages}>
            <Image
              src="/Logo_RE.png"
              alt="banniere"
              width={750}
              height={200}
              className={styles.headerImages}
            />
            <Image
              src="/Logo_RE.png"
              alt="banniere"
              width={150}
              height={150}
              style={{
                position: 'absolute',
                top: '130px',
                left: '20px',
                border : '4px solid rgb(21, 32, 43)',
                borderRadius: '50%',
              }}
            />
          </div>

          <div className={styles.bio}>
            <h3>
              {user.utilisateur_nom} {user.utilisateur_prenom}
            </h3>

            {
              Boolean(user.t_profil)
                ? <p>{user.t_profil.profil_description}</p>
                : <p>Pas encore de description</p>
            }

            {
              Boolean(user.utilisateur_datenaissance) &&
              <div>
                <span> née le {user.utilisateur_datenaissance}</span>
                <br/>
                <span> Inscrit depuis {user.utilisateur_dateinscription}</span>
              </div>
            }
            {
              ressources.length !== 0
                ? <Ressources ressources={ressources}/>
                : <p>{user.utilisateur_prenom} n'a pas encore publier de ressource</p>
            }

          </div>
        </div>
      </div>
  );
}
