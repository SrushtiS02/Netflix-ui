
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVvuDrEjBlJjHi_6X52jIDaFKnfmJX2Ps",
  authDomain: "react-netflix-clone-11005.firebaseapp.com",
  projectId: "react-netflix-clone-11005",
  storageBucket: "react-netflix-clone-11005.appspot.com",
  messagingSenderId: "943163771036",
  appId: "1:943163771036:web:c16fab5ec64b9fa23d0559",
  measurementId: "G-R2XB6S8R2W"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);