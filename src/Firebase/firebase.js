
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCs_mcGkJxH0jJTjQLK7EpAj_AuXr3jPVM",
    authDomain: "react-firebase-1ae84.firebaseapp.com",
    projectId: "react-firebase-1ae84",
    storageBucket: "react-firebase-1ae84.appspot.com",
    messagingSenderId: "312899209163",
    appId: "1:312899209163:web:a63467f6f5b210ec52984e"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();



const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export {
    db,
    register,
    login
}