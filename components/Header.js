import Link  from "next/link";

export default function Header() 
{
    

return (
    <div>
        <h1>API Rest</h1>
        <Link href="/connexion">
          <button>connexion</button>
        </Link>
        <button href='#'>Inscription</button>
    </div>
      

    

 


);
}