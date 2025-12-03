import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZpMZp6NiILlGEr77eTZLFAlYT_825ghc",
  authDomain: "cis371-947ba.firebaseapp.com",
  projectId: "cis371-947ba",
  storageBucket: "cis371-947ba.appspot.com",
  messagingSenderId: "919604137126",
  appId: "1:919604137126:web:2930ba67dc1bf06cd97867"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
