import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import * as API from '../../service/API'

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
            console.log(data)
            setConnectedUser(response.data.data);
          }
        })
        .catch(error => console.log(error))
      }
      fetchSomethingById()
    }, [id])
    /*
    useEffect(() => { 
        //const user = users.find( users => users.id  )
        //setConnectedUser(user)
        console.log("useeffet " + id);

    }, []);*/

    const modifierprofil = () => {
      router.push('/profile/modifierprofil')
  }
  return (
    <> 
    <h1>Profile</h1>
            {Connecteduser?
                <>
                    <ul>
                        <li>pseudo : {Connecteduser.pseudo}</li>
                        <li>nom: {Connecteduser.nom}</li>
                        <li>prenom: {Connecteduser.prenom}</li>
                        <li>email: {Connecteduser.email}</li>
                        <li><p>Bio:</p> {Connecteduser.bio ? Connecteduser.bio : "'Vous n'avez pas de biographie, cliquez sur le bouton Modifier Profil pour ajouter une biographie'"}</li>
                    </ul> 
                    <button onClick={modifierprofil}>Modifier Profil</button> 
                </>
                : ''
            }
    </>
  )
}