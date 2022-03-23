import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import qodeless from "../../assets/images/qodeless-logo.png";

export function Home() {
  const navigator = useNavigate();
  const { user , signOut} = useAuth();

  async function handleLogout(){
    if(user){
      await signOut();
    }
    navigator('/');
  }

  return (
    <div>
      <h1>HOME</h1>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <img  src={user.avatar ?? qodeless} alt="profile pic"/>
          <button onClick={handleLogout}>DESLOGAR</button>
        </div>
      ) : (
        <h1>SEM NOME</h1>
      )}
    </div>
  );
}
