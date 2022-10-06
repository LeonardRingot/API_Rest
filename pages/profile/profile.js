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
  return (
    <> 
    <h1>Profile</h1>
            {Connecteduser  ?
                <>
                    <ul>
                        <li>pseudo : {Connecteduser.pseudo}</li>
                        <li>nom: {Connecteduser.nom}</li>
                        <li>prenom: {Connecteduser.prenom}</li>
                        <li>email: {Connecteduser.email}</li>
                    </ul> 
                </>
                : ''
            }
    </>
  )
}