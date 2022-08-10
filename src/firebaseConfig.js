
import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW4bmjZafrkcWvtPCnAlqiFvWA8XK1kEQ",
  authDomain: "netflix-react-66c82.firebaseapp.com",
  projectId: "netflix-react-66c82",
  storageBucket: "netflix-react-66c82.appspot.com",
  messagingSenderId: "379717695659",
  appId: "1:379717695659:web:9a8b365150228792e4dfee"
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const db = getFirestore(app);