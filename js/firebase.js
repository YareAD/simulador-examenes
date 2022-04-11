import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    doc,
    getDocs,
    query,
    where,
    setDoc,
    deleteDoc,
    serverTimestamp,
    orderBy
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDROBOQGL9vu-Ppcgi8BrS2Hy_7eKFhB2A",
    authDomain: "simulador-examenes.firebaseapp.com",
    databaseURL: "https://simulador-examenes-default-rtdb.firebaseio.com",
    projectId: "simulador-examenes",
    storageBucket: "simulador-examenes.appspot.com",
    messagingSenderId: "313107103495",
    appId: "1:313107103495:web:8d4df11f2ceb0b84fc8fa2"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();


export {
    db,
    collection,
    addDoc,
    getDoc,
    doc,
    getDocs,
    query,
    where,
    setDoc,
    deleteDoc,
    serverTimestamp,
    orderBy
}