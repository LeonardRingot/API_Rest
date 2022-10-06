import { useCallback,useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import * as API from '../service/API'
export default function connexion() 
{
  const router = useRouter()
  const [erreur, setErreur] = useState('');
  const[IsOk, setIsOk] = useState('');
  const [ConnexionForm, setConnexionform]= useState({
   pseudo:'',
   email:'',
    pwd:''
  })
  const handleChange = (e) =>
  {
    const value = e.target.value;
    setConnexionform({
      ...ConnexionForm, [e.target.name]: value
    });
  }
  
  const ScriptFormConnexion = (e) =>
  {
    
    e.preventDefault()
    API.requetePostConnexion( ConnexionForm.pseudo, ConnexionForm.email, ConnexionForm.pwd).then(response => {
        if(response.status == 200){
          
          router.push({pathname: '../profile/profile', query: {id: response.data.data}});
          setIsOk('Connexion etablie');
        } else {
          setErreur('Champs incorrects.');
          return res.status(400).send('Utilisateur introuvable')
        }
      }).catch(function(error){
        console.log(error);
      });
  }
return (
  <div>
    <h1>Formulaire de connexion</h1>
    <form  onSubmit={ScriptFormConnexion} className={styles.myform} action="" method="post">

    <label htmlFor='pseudo'>Pseudo:</label>
      <input onChange={handleChange} type="text"  name="pseudo" /><br></br>

      <label htmlFor='email'>email:</label>
      <input onChange={handleChange} type="email"  name="email" /><br></br>

      <label htmlFor='pwd'>Mot de passe:</label>
      <input onChange={handleChange} type="password"  name="pwd" /><br></br>

      <button type="submit">Submit</button><br></br>
      <p>{erreur}</p>
      <p>{IsOk}</p>
    </form>
  </div>
);
}