import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigator = useNavigate();
  const { user, signInWithGoogle,signIn, signOut } = useAuth();

  async function handleLogin(){
    if(!user){
      await signInWithGoogle();
    }
    navigator('/home');
  }

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <button onClick={handleLogin}>LOGAR COM GOOGLE</button>
    </div>
  );
}
