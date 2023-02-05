// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnHutR2ujPpAjvK-UCfg84APiHFSCWdcY",
  authDomain: "astroschorsch-47277.firebaseapp.com",
  databaseURL: "https://astroschorsch-47277-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "astroschorsch-47277",
  storageBucket: "astroschorsch-47277.appspot.com",
  messagingSenderId: "950043155808",
  appId: "1:950043155808:web:8e3d0d10593d3de5641205"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()