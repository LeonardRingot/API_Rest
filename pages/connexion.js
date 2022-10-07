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
    API.requetePostConnexion( ConnexionForm.email, ConnexionForm.pwd).then(response => {
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
  <div className={styles.myContainer}>
    <h1>Formulaire de connexion</h1>
    
    <form className={styles.myformConnexion}  onSubmit={ScriptFormConnexion}  action="" method="post">

      <label htmlFor='email'>Email:</label>
      <input onChange={handleChange} type="email" className={styles.formcontrol} name="email" /><br></br>

      <label htmlFor='pwd'>Mot de passe:</label>
      <input onChange={handleChange} type="password" className={styles.formcontrol} name="pwd" /><br></br>

      <input  value="Submit"className={styles.formcontrolsubmit} type="submit"/> <br></br>
      <p>{erreur}</p>
      <p>{IsOk}</p>
    </form>
  </div>
);
}