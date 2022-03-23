import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "../types/user";
import { auth, database, firebase, storage } from "../services/firebase";

//#region TYPES CONTEXT
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  CreateUser: (email:string, password:string, name:string, photo: any) => Promise<void>;
  LoginWithPassword: (email:string, password:string) => Promise<firebase.User>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};
//#endregion

//criando um CONTEXTO do TIPO AUTH_CONTEXT_TYPE
//ele vai passar um USER e uma FUNCTION para todos os CHILDREN que ele tiver
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  //cria um USE_EFFECT que vai ficar olhando sempre quando a pagina for atualizar
  //pois o [ ] não tem dado, isso só vai rodar quando a página iniciar
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //se existir um USER ele vai colocar as informações dentro do CONTEXTO
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    //pegando o provedor do google para fazer login
    const provider = new firebase.auth.GoogleAuthProvider();

    //fazendo login com o POPUP
    const result = await auth.signInWithPopup(provider);

    //se existir um USER vai colocar ele dentro do CONTEXTO
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function CreateUser(email, password,name,photo) {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = await auth.signInWithEmailAndPassword(email, password);

    await user.user.updateProfile({
      displayName: name,
    })

    await storage.ref(`images/${user.user.uid}`).put(photo);

    const pic = await storage.ref(`images`).child(user.user.uid).getDownloadURL();

    setUser({
      id: user.user.uid,
      name: user.user.displayName,
      avatar: pic,
    });
  }

  async function LoginWithPassword(email,password) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      const photo = await storage.ref(`images`).child(user.user.uid).getDownloadURL();

      setUser({
        id: user.user.uid,
        name: user.user.displayName,
        avatar: photo,
      });

      return user.user;

    } catch (ex) {
      alert(ex);
      return;
    }
  }

  async function signOut(){
    if(user){
      await auth.signOut();
      setUser(null);
    }
  }

  return (
    //aqui você está passando o OBJETO que vai ir o USER a FUNCTION
    <AuthContext.Provider value={{ user, signInWithGoogle, CreateUser,LoginWithPassword , signOut}}>
      {props.children}
    </AuthContext.Provider>
  );
}
