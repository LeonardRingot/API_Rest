import React ,{ useEffect, useState } from 'react'
import * as API from '../service/API'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
export default function inscription() 
{
  const router = useRouter()
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [InscriptionForm, setInscriptionForm]= useState({
      pseudo:'',
      nom:'',
      prenom:'',
      email:'',
      pwd:''
    })
    const handleChange = (e) =>
    {
      const value = e.target.value;
      setInscriptionForm({
        ...InscriptionForm, [e.target.name]: value
      });
    }
    const ScriptForm = (e) =>
    {
      e.preventDefault()
      API.requetePost(InscriptionForm.pseudo, InscriptionForm.nom
        , InscriptionForm.prenom, InscriptionForm.email
        , InscriptionForm.pwd).then(response => {
          if(response.status == 201){
            //router.push('../profile/profile');
            setIsOk('Compte crée');
          } else {
            setErreur('Adresse mail deja utilisée.');
          }
        }).catch(function(error){
        console.log(error);
      });
    }
     return (
      <div>
     <h1>Formulaire d'Inscription</h1>
     <div>
        <form className={styles.myform}  onSubmit={ScriptForm} action='' method="post">
          <label htmlFor='pseudo'>Pseudo:</label>
          <input onChange={handleChange} type="text" name="pseudo" /><br></br>
          <label htmlFor='nom'>Nom:</label>
          <input onChange={handleChange} type="text" name="nom" /><br></br>
          <label htmlFor='prenom'>Prenom:</label>
          <input onChange={handleChange} type="text" name="prenom" /><br></br>
          <label htmlFor='email'>mail:</label>
          <input onChange={handleChange} type="email" name="email" /><br></br>
          <label htmlFor='pwd'>Mot de passe:</label>
          <input onChange={handleChange} type="password" name="pwd" /><br></br>
          <button value='submit' type="submit">Submit</button><br></br>
         </form>
         <p>{erreur}</p>
         <p>{IsOk}</p>
     </div> 
   </div>
);
}