import React ,{ useEffect, useState } from 'react'
import API from '../service/API'
import { Router } from 'next/router'
import styles from '../styles/Home.module.css'
 
export default function inscription() 
{
  console.log('aaa');
    const [InscriptionForm, setInscriptionForm]= useState({
      pseudo:'',
      nom:'',
      prenom:'',
      email:'',
      pwd:''
      
    })
    console.log('bbb');
    const handlechange = (e) =>
    {
      const value = e.target.value;
      setInscriptionForm({
        ...InscriptionForm, [e.target.nom]: value
      });
    }
    console.log('ccc');
    const ScriptForm = (e) =>
    {
      console.log('ddd');
         //e.preventdefault()
         const {pseudo, nom, prenom, email, pwd  }=InscriptionForm
         debugger;
        API.requeteGet('users' ).then(response=>
          {
            debugger;
            const users = response.data;
            debugger;
           const checkEmail = users.find(users.email === email)
            const checkPseudo = users.find(users.pseudo === pseudo)
            console.log('test');
            debugger;
          if (checkEmail != null)
          {
            return console.log("Adresse mail deja utilisée");
          }
          debugger;
          if (checkPseudo != null)
          {
            return console.log("Pseudo deja utilisée");
          }
          debugger;
          API.requetePost('users', pseudo, nom, prenom, email, pwd, ).then(response=>{
            console.log(response.data)
            Router.push('/dashboard')
          })
          debugger;
        })
    }
     return (
<div>
     <h1>Formulaire d'Inscription</h1>
     <div>
        <form className={styles.myform} onChange={handlechange} onSubmit={ScriptForm} action='' method="post">
        <label htmlFor='pseudo'>Pseudo:</label>
         <input type="text"  name="pseudo" /><br></br>
    
          <label htmlFor='nom'>Nom:</label>
         <input type="text"  name="nom" /><br></br>
    
          <label htmlFor='prenom'>Prenom:</label>
          <input type="text"  name="prenom" /><br></br>
    
           <label htmlFor='email'>mail:</label>
           <input type="email"  name="email" /><br></br>
    
           <label htmlFor='pwd'>Mot de passe:</label>
           <input type="password"  name="pwd" /><br></br>
    
           <button value='submit' type="submit">Submit</button><br></br>
         </form>
     </div> 
   </div>
);
}