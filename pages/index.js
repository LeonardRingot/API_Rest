import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Accueil from "../components/Accueil";
import HeaderAccueil from "../components/HeaderAccueil";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
        <main className={styles.main}>
          <HeaderAccueil></HeaderAccueil>
        <Accueil></Accueil>
        <Footer></Footer>
        </main>
       
    </>
)
}

