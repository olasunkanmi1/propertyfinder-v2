// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCaQlkQthEDaws5J0q8E3cj7qaqQWwN5lY",
    authDomain: "propertyfinder-860ed.firebaseapp.com",
    projectId: "propertyfinder-860ed",
    storageBucket: "propertyfinder-860ed.appspot.com",
    messagingSenderId: "832528748421",
    appId: "1:832528748421:web:5da164a1af31b1de3a3eec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage  = getStorage(app);

export { app, db, storage };