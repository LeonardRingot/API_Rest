import React ,{ useEffect, useState } from 'react'
import * as API from '../service/API'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es-us'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'
export default function inscription() 
{
  const router = useRouter()
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [date, setDate] = useState(dayjs())
    const [InscriptionForm, setInscriptionForm]= useState({
      pseudo:'',
      nom:'',
      prenom:'',
      email:'',
      pwd:'',
      birthday:'',
      bio:''
    })
    const handleChange = (e) =>
    {
      const value = e.target.value;
      setInscriptionForm({
        ...InscriptionForm, [e.target.name]: value
      });
    }
    function ScriptForm (event) 
    {
      const data = {
        pseudo:event.target.pseudo.value,
        nom:event.target.nom.value,
        prenom:event.target.prenom.value,
        email:event.target.email.value,
        pwd:event.target.pwd.value,
        birthday:`${new Date(date)}`,
        bio:event.target.bio.value,
      }
      event.preventDefault()
      API.requetePost(data.pseudo,
        data.nom, 
        data.prenom,
        data.email,
        data.pwd,
        data.birthday,
        data.bio ).then(response => {
          if(response.status == 200){
            setIsOk('Compte crée');
          } else {
            setErreur('Adresse mail deja utilisée.');
          }
        }).catch(function(error){
        console.log(error);
      });
    }
    return (
      <>
      <div className={styles.registerpraticiens}>
      <h1>Formulaire d'inscription Praticiens</h1>
   <Box component="form" noValidate  onSubmit={ScriptForm} method="post" sx={{ p: 2, border: '1px solid  black', width:'50%', textAlign:'center' ,display:'inline-block' }} >
        <TextField 
        onChange={handleChange}
        margin='normal'
        fullWidth
        required
       id="pseudo"
       name="pseudo"
       label="pseudo"
        />
        <TextField 
        margin='normal'
        onChange={handleChange}
        required
        fullWidth
       id="nom"
       name="nom"
       type="text"
       label="Nom"
        />
         <TextField 
        margin='normal'
        onChange={handleChange}
        required
        fullWidth
       id="prenom"
       name="prenom"
       type="text"
       label="Prenom"
        />
        
        <TextField 
        margin='normal'
        onChange={handleChange}
        required
        fullWidth
       id="email"
       name="email"
       type="email"
       label="Adresse mail"
        />
         <TextField 
        margin='normal'
        onChange={handleChange}
        required
        fullWidth
       id="pwd"
       name="pwd"
       type="password"
       label="Mot de passe "
        />
        <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <MobileDatePicker
          label="birthday"
          inputFormat='YYYY/MM/DD'
          name="birthday"
          type="date"
          value={date}
          onChange={newDate => setDate(dayjs(newDate, "YYYY/MM/DD").format())}
          renderInput={(props) => <TextField  {...props}  />}
          />
        </LocalizationProvider>
           <TextField 
        margin='normal'
        onChange={handleChange}
        required
        fullWidth
       id="bio"
       name="bio"
       type="text"
       label="bio "
        />

        <Button type="submit" value="submit" >Envoyer</Button>
     </Box>
      </div>
      
      
</>
  )
}