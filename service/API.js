import axios from "axios";
export default function API()
{
    
   const requetePost= axios.post({
            method:'post',
            url: 'http://localhost:5000/connexion',
            data:{
                email:'',
                pwd:'',
            }
            
        });
     const requeteGet =    axios.get({
            method:'get',
            url: 'http://localhost:5000/users',
            data:{
                email:'',
                pwd:'',
                nom:'',
                prenom:'',
                pseudo:''
                
            }
            
        });

    const API ={
        
       
    }
    
}