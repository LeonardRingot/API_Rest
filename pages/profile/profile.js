import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import * as API from '../../service/API'
import Box  from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styles from '../../styles/Home.module.css'

import {Button }from '@mui/material';
import test from'../../public/test.jpg'

export default function profile() {
    const router = useRouter()
    const {id} = router.query
    const [Connecteduser, setConnectedUser] = useState({})
    useEffect(() => {
      if(!id) {
        return;
      }
      const fetchSomethingById = async () => {
        API.requeteGetProfile(id)
        .then(response => {
          if(response.status == 200){
            console.log(response.data)
            setConnectedUser(response.data.data);
          }
        })
        .catch(error => console.log(error))
      }
      fetchSomethingById()
    }, [id])
    

    const modifierprofil = () => {
      router.push(`/profile/modifierprofil?id=${id}`)
  }
  return (
    <>
     <div className={styles.macarte}>
    <h1>Mon profile</h1>

            {Connecteduser?
                <><Box>
                    <Card sx={{ maxWidth: 500,width:'50%', textAlign:'center' ,display:'inline-block' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={require('../../public/test.jpg')}
         
          alt="mon image de profile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Mes Infos personnelles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mon pseudo:{Connecteduser.pseudo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mon nom de famille:{Connecteduser.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mon Prenom:{Connecteduser.prenom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mon adresse mail:{Connecteduser.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ma Biographie:{Connecteduser.bio ? Connecteduser.bio : "'Vous n'aveez pas de biographie'"}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button onClick={modifierprofil} >Modifier mon profile</Button>
    </Card>
        </Box>
                    
                    
                </>
                : ''
            }
      </div>
    </>
    
  )
}