import { useCallback,useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import {useCookies} from 'react-cookie'
import * as API from '../service/API'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
export default function connexion() 
{
  const router = useRouter()
  const [erreur, setErreur] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
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
  
  function ScriptFormConnexion  (event)
    {
      event.preventDefault()
      const data = {
        email:event.target.email.value,
        pwd:event.target.pwd.value,
      }
      API.requetePostConnexion(data.email, data.pwd).then(response => {
       
          if(response.status == 200){    
            console.log(response.data.id)      
            router.push({pathname: '../profile/profile', query: {id: response.data.id}});
            console.log(response.data.id)
            setCookie("user", [response.data.accessToken, response.data.refreshToken, data.email], "/");
            console.log("COOKIE CREATED");
            console.log(response.data.accessToken)
          } else {
            return res.status(400).send('user introuvable')
            
          }
        }).catch(function(error){
          console.log(error);
        });
    }
return (
  <div className={styles.login}>
  <Box component="form" noValidate  onSubmit={ScriptFormConnexion} method="post"  sx={{p: 2, width:'50%', textAlign:'center' ,display:'inline-block'}} >
    <h1>Formulaire de Connexion</h1>
    <TextField 
          onChange={handleChange}
          margin='normal'
          fullWidth
          required
         id="email"
         name="email"
         label="Adress mail"
          />
          <TextField 
          margin='normal'
          onChange={handleChange}
          required
          fullWidth
         id="pwd"
         name="pwd"
         type="password"
         label="Mot de passe"
          />
          <Button type="submit" value="submit" >Envoyer</Button>
    </Box>
    </div>
);
}