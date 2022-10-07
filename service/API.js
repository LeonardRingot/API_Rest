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

export function requetePostConnexion( email, pwd){
  var data = JSON.stringify({
    "email": email,
    "pwd": pwd
  });
  var configConnexion = {
    method: 'post',
    url: 'http://localhost:5000/api/auths/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
return axios(configConnexion);
}

export function requeteGetProfile(id){
  var configGetId = {
    method: 'get',
    url: 'http://localhost:5000/api/users/' + id,
    headers: { 
      'Content-Type': 'application/json'
    }
  };
return axios(configGetId);
}

export function requeteUpdateProfil(pseudo, nom, prenom, email, pwd, bio, id){
  
  var data = JSON.stringify({
      "pseudo": pseudo,
      "nom": nom,
      "prenom": prenom,
      "email": email,
      "pwd": pwd,
      "bio": bio,
     
    });
  var configUpdateProfile = {
      method: 'put',
      url: 'http://localhost:5000/api/users/' +id,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
  return axios(configUpdateProfile);
}