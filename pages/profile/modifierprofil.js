
import { useRouter } from 'next/router';
import React, { useState , useEffect } from 'react'
import * as API from '../../service/API'
import {LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import styles from '../../styles/Home.module.css'
import 'dayjs/locale/es-us'
import Box  from '@mui/material/Box'
import Button from '@mui/material/Button'
import  TextField  from '@mui/material/TextField'

export default function Register() {
    const [erreur, setErreur] = useState('');
    const[IsOk, setIsOk] = useState('');
    const [date, setDate] = useState(dayjs())
    const router = useRouter()
    const {id} = router.query
    const [currentUser, setCurrentUser] = useState()

    const [updateProfile, setUpdateProfile] = useState({
        pseudo: '',
        nom: '',
        prenom: '',
        email: '',
        pwd: '',
        birthday:'', 
        bio:''
    })
    const handleChange = (e) => {
      const value = e.target.value;
      setUpdateProfile({
        ...updateProfile,
        [e.target.name]: value
      });
  }
    useEffect(() => {
        const fetchSomethingById = async () => {
          API.requeteUpdateProfil(id)
          .then(response => {
            if(response.status == 201){
              setCurrentUser(response.data.data);
            }
          })
          .catch(error => console.log(error))
        }
        fetchSomethingById()
      }, [id])
    
        function ModifierProfileSubmit  (event)  {
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
          API.requeteUpdateProfil(id,data.pseudo, data.nom
            , data.prenom, data.email
            , data.pwd, data.birthday,data.bio).then(response => {
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
      <>
     <div className={styles.registerpraticiens}>
     <h1>Formulaire Modif </h1>
     <div>
     <Box component="form" noValidate  onSubmit={ModifierProfileSubmit} method="post" sx={{ p: 2, border: '1px solid  black', width:'50%', textAlign:'center' ,display:'inline-block' }} >
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
         <p>{erreur}</p>
         <p>{IsOk}</p>
     </div> 
    </div>
    </>
    );
    
}