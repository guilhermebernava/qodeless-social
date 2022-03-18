import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth, firebase } from "../services/firebase";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigator = useNavigate();
  const { user, signInWithGoogle, signIn, signOut } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    navigator("/home");
  }

  async function handleCreateUser() {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = await auth.signInWithEmailAndPassword(email, password);

    await user.user.updateProfile({
      displayName: name,
    })

    setEmail("");
    setPassword("");

    navigator("/home");
  }

  async function handleLoginWithPassword() {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);

      if (user.user !== null) {
        console.log(user.user.toJSON());
        setEmail("");
        setPassword("");
        navigator("/home");
      }
    } catch (ex) {
      alert(ex);
      return;
    }
  }

  return (
    <div>
      <h1>LOGIN PAGE</h1>
      <button onClick={handleLogin}>LOGAR COM GOOGLE</button>
      <form action="">
        <input
          type="text"
          placeholder="EMAIL"
          id=""
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="SENHA"
          id=""
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="text"
          placeholder="NOME"
          id=""
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleCreateUser();
          }}
        >
          {" "}
          CRIAR{" "}
        </button>
      </form>
      <button onClick={handleLoginWithPassword}>LOGAR COM EMAIL E SENHA</button>
    </div>
  );
}
