import { useCallback,useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import API  from '../service/API'
export default function connexion() 
{
 API.requetePost;
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    fetch('/api/formdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [])
return (
  <div>
    <h1>Formulaire de connexion</h1>
    <form  onSubmit={handleSubmit} className={styles.myform} action="/" method="post">
      <label for="pseudo">pseudo:</label>
      <input type="text"  name="pseudo" /><br></br>

      <label for="email">mail:</label>
      <input type="email"  name="email" /><br></br>

      <label for="pwd">Mot de passe:</label>
      <input type="password"  name="pwd" /><br></br>

      <button type="submit">Submit</button><br></br>
    </form>
  </div>
);
}