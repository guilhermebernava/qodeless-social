import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBFJge2cbv6mgcSgbo-A4Mg3pmE0PmHpBo",
  authDomain: "qodeless-social.firebaseapp.com",
  projectId: "qodeless-social",
  storageBucket: "qodeless-social.appspot.com",
  messagingSenderId: "782352071784",
  appId: "1:782352071784:web:67189646417ce94dfc8fdd"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export {auth, database, firebase};