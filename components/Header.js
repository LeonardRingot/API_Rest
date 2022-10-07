import Link  from "next/link";
import styles from '../styles/Home.module.css'
export default function Header() 
{
return (
    <div>
        <h1>API Rest</h1>
        <Link href="/connexion">
          <button className={styles.mybutton}>Connexion</button>
        </Link>
       
        <Link href="/inscription">
          <button className={styles.mybutton2}>Inscription</button>
        </Link>
    </div>
);
}