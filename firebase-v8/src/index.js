import React from 'react';
import ReactDOM from 'react-dom/client';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref } from "firebase/database";
import { getDocs } from 'firebase/firestore'

// import {
//   getFirestore, collection, getDocs
// } from 'firebase/firestore'

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>hello world</div>
  </React.StrictMode>
);

const firebaseConfig = {
    apiKey: "AIzaSyDtwrqzjyug397_iZptPuBA_xgsRqYNujQ",
    authDomain: "learning-firebase-2b9af.firebaseapp.com",
    projectId: "learning-firebase-2b9af",
    storageBucket: "learning-firebase-2b9af.appspot.com",
    messagingSenderId: "147784663877",
    appId: "1:147784663877:web:930807a84b5d2aafaeb42c"
};

// init firebase
const app = initializeApp(firebaseConfig);

const db =  getDatabase();

// const usersRef = ref(db, 'users/');
// usersRef
//     // .once()
//     .then(function(apiResp){
//         const val = apiResp.val();
//         console.log("val", val)
//     })
//     .catch(function(){

//     })

// getDocs(usersRef)
//     .then(function(apiResp){
//         const val = apiResp.val();
//         console.log("val", val)
//     })
//     .catch(function(){

//     })

// // init services
// const db = getFirestore()
 
// // collection ref
// const colRef = collection(db, 'bhemu')

// // get collection data
// getDocs(colRef)
//   .then(snapshot => {
//     // console.log(snapshot.docs)
//     let student = []
//     snapshot.docs.forEach(doc => {
//       student.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(student)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })