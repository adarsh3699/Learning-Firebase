import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore';

function Auth() {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: 'AIzaSyDtwrqzjyug397_iZptPuBA_xgsRqYNujQ',
        authDomain: 'learning-firebase-2b9af.firebaseapp.com',
        databaseURL: 'https://learning-firebase-2b9af-default-rtdb.firebaseio.com',
        projectId: 'learning-firebase-2b9af',
        storageBucket: 'learning-firebase-2b9af.appspot.com',
        messagingSenderId: '147784663877',
        appId: '1:147784663877:web:930807a84b5d2aafaeb42c',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getFirestore();

    // const analytics = getAnalytics(app);

    // collection ref
    const colRef = collection(database, 'user');

    // get collection data
    getDocs(colRef)
        .then((snapshot) => {
            let user = [];
            snapshot.docs.forEach((doc) => {
                user.push({ ...doc.data(), id: doc.id });
            });

            console.log(user);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

export { Auth };
