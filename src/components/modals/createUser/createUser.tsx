import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import styles from "./style.module.css";

import close from "../../../assets/images/close-white.png";

type ModalCreateUserProps = {
  setOpenModal: (value: boolean) => void;
};

export function ModalCreateUser(props: ModalCreateUserProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  const navigator = useNavigate();

  const { CreateUser } = useAuth();

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault();
    await CreateUser(email, password, name, photo);
    setEmail("");
    setPassword("");
    navigator("/home");
  }

  return (
    <div className={styles.all}>
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.closeBox}>
            <button
              className={styles.close}
              onClick={() => props.setOpenModal(false)}
            >
              <img src={close} alt="CLOSE" />
            </button>
          </div>
          <form className={styles.form}>
            <p>Name</p>
            <input
              className={styles.input}
              type="text"
              placeholder="NAME"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p>Email</p>
            <input
              className={styles.input}
              type="email"
              placeholder="EMAIL"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p>Password</p>
            <input
              className={styles.input}
              type="password"
              placeholder="SENHA"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor="formId" className={styles.import}>
              Choose your profile picture
              <br />
              <input
                name=""
                type="file"
                id="formId"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
              {}
            </label>
            <button onClick={handleCreateUser}>Create</button>
          </form>
        </div>
      </div>
      </div>
  );
}
