import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import qodeless from "../../assets/images/qodeless-logo.png";
import google from "../../assets/images/google.svg";

import "./login.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigator = useNavigate();
  const { user, signInWithGoogle, CreateUser, LoginWithPassword } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
    navigator("/home");
  }

  async function handleCreateUser() {
    await CreateUser(email, password, name);
    setEmail("");
    setPassword("");
    navigator("/home");
  }

  async function handleLoginWithPassword(e: FormEvent) {
    e.preventDefault();

    try {
      const result = await LoginWithPassword(email, password);

      if(result){
        navigator("/home");
      }
      return

    } catch {
      return;
    }
  }

  return (
    <div className="main">
      <div className="box">
        <img className="qodeless" src={qodeless} alt="qodeless-logo" />
        <form className="form">
          <p>Email</p>
          <input
            type="email"
            placeholder="EMAIL"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="SENHA"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={handleLoginWithPassword}>Sign In</button>
        </form>
        <div className="bottom">
          <p>or continue with</p>
          <button className="login" onClick={handleLogin}>
            <img className="google" src={google} alt="google" />
          </button>
          <p>
            Don't have an account yet?{" "}
            <button onClick={handleCreateUser}>Register for free</button>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
