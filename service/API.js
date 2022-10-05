import axios from "axios"; 
export function requetePost(pseudo, nom, prenom, email, pwd){
    var data = JSON.stringify({
        "pseudo": pseudo,
        "nom": nom,
        "prenom": prenom,
        "email": email,
        "pwd": pwd
      });
    var config = {
        method: 'post',
        url: 'http://localhost:5000/api/users',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
    return axios(config);
}
export function requeteGet(){
    console.log("pass")
    return axios.get({
        method:'get',
        url: 'http://localhost:5000/api/users',
        data:{
            email:'',
            pwd:'',
    }});
}