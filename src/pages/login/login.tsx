import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import qodeless from "../../assets/images/qodeless-logo.png";
import google from "../../assets/images/google.svg";

import styles from "./login.module.css";
import { ModalCreateUser } from "../../components/modals/createUser/createUser";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[openModal, setOpenModal] = useState(false);

  const navigator = useNavigate();
  
  const { user, signInWithGoogle, CreateUser, LoginWithPassword } = useAuth();

  async function handleLogin() {
    if (!user) {
      await signInWithGoogle();
    }
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
    <div className={styles.main}>
      <div className={styles.box}>
        <img className={styles.qodeless} src={qodeless} alt="qodeless-logo" />
        <form className={styles.form}>
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
        <div className={styles.bottom}>
          <p>or continue with</p>
          <button className={styles.login} onClick={handleLogin}>
            <img className={styles.google} src={google} alt="google" />
          </button>
          <p>
            Don't have an account yet? {" "}<button onClick={() => setOpenModal(true)}>Register for free</button>
          </p>
        </div>
      </div>
    {openModal && <ModalCreateUser setOpenModal={setOpenModal}/>}
    </div>
  );
}
