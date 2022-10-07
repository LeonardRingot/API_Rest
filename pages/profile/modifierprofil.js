
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import * as API from '../../service/API'

export default function Register({  }) {
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const router = useRouter()
    const {id} = router.query
    const [Connecteduser, setConnectedUser] = useState()

    const [updateProfile, setUpdateProfile] = useState({
        pseudo: '',
        nom: '',
        prenom: '',
        email: '',
        pwd: '',
        bio:''
    })

    useEffect(() => {
        if(!id) {
          return;
        }
        const fetchSomethingById = async () => {
          API.requeteUpdateProfil()
          .then(response => {
            if(response.status == 201){
              setConnectedUser(response.data.data);
            }
          })
          .catch(error => console.log(error))
        }
        fetchSomethingById()
      }, [id])
    useEffect(() => { 
        setUpdateProfile({
            pseudo: Connecteduser ? Connecteduser.pseudo : '',
            nom: Connecteduser ? Connecteduser.nom : '',
            prenom: Connecteduser ? Connecteduser.prenom : '',
            email: Connecteduser ? Connecteduser.email : '',
            pwd: '',
            bio: Connecteduser ? Connecteduser.bio : ''  
        })
    }, [Connecteduser]);

    const handleChange = (e) => {
        const value = e.target.value;
        setUpdateProfile({
          ...updateProfile,
          [e.target.name]: value
        });
    }

    const ModifierProfileSubmit = (e) => {
        
        e.preventDefault()
        API.requeteUpdateProfil(updateProfile.pseudo, updateProfile.nom
          , updateProfile.prenom, updateProfile.email
          , updateProfile.pwd, updateProfile.bio).then(response => {
            if(response.status == 201){
              //router.push('../profile/profile');
              setIsOk('User mis a jour');
            } else {
              setErreur('NoN');
            }
          }).catch(function(error){
          console.log(error);
        });

            
        
    }

    return (
<div >
     <h1>Formulaire Modif </h1>
     <div>
        <form  onSubmit={ModifierProfileSubmit} action='' method="post">
          <label htmlFor='pseudo'>Pseudo:</label>
          <input onChange={handleChange} type="text"  name="pseudo" /><br></br>
          <label htmlFor='nom'>Nom:</label>
          <input onChange={handleChange} type="text"  name="nom" /><br></br>
          <label htmlFor='prenom'>Prenom:</label>
          <input onChange={handleChange} type="text"   name="prenom" /><br></br>
          <label htmlFor='email'>Email:</label>
          <input onChange={handleChange} type="email"  name="email" /><br></br>
          <label htmlFor='pwd'>Mot de passe:</label>
          <input onChange={handleChange} type="password"  name="pwd" /><br></br>
          <label htmlFor='bio'>Biographie:</label>
          <textarea  type="text" id="bio" name="bio"   onChange={handleChange}></textarea>
          <input  value="Submit" type="submit"/> <br></br>
         </form>
         <p>{erreur}</p>
         <p>{IsOk}</p>
     </div> 
   </div>
    );
    
}