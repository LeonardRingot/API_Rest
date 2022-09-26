export default function connexion() 
{
return (
    <form action="" method="post">
  <label for="pseudo">pseudo:</label>
  <input type="text"  name="pseudo" />

  <label for="email">mail:</label>
  <input type="email"  name="email" />

  <label for="password">Mot de passe:</label>
  <input type="password"  name="password" />

  <button type="submit">Submit</button>
</form>
    
);
}