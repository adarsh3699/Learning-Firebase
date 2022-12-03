import React from 'react';
import { initializeApp } from 'firebase/app';
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

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDtwrqzjyug397_iZptPuBA_xgsRqYNujQ',
    authDomain: 'learning-firebase-2b9af.firebaseapp.com',
    projectId: 'learning-firebase-2b9af',
    storageBucket: 'learning-firebase-2b9af.appspot.com',
    messagingSenderId: '147784663877',
    appId: '1:147784663877:web:930807a84b5d2aafaeb42c',
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// collection ref
const colRef = collection(db, 'bhemu');
// queries
// const que = query(colRef, where("name", "==", "aman"))
const que = query(colRef, orderBy('time'));

// get real time collection data
onSnapshot(que, (snapshot) => {
    let students = [];
    snapshot.docs.forEach((doc) => {
        students.push({ ...doc.data(), id: doc.id });
    });
    console.log(students);
});

// fetching a single document (& realtime)
const docRef = doc(db, 'bhemu', 'W8c4vIS5LLmkezmSPKtt');

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
});

function Learning() {
    function handleLoginForm(e) {
        e.preventDefault();

        addDoc(colRef, {
            name: e.target.name.value,
            class: e.target.class.value,
            time: serverTimestamp(),
        }).then(() => {
            console.log('add');
            e.target.reset();
        });
    }

    function handleSignUpForm(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                console.log('User Created: ', cred.user);
                e.target.reset();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    // function handleUpdateBtn(e) {
    //     e.preventDefault()

    //     updateDoc(doc(db, 'bhemu', e.target.id.value), { name: e.target.name.value } )
    //     .then(() => {
    //         console.log("Updated");
    //         e.target.reset()
    //     })
    // }

    return (
        <div id="app">
            <h1>Login Page</h1>
            <form onSubmit={handleLoginForm}>
                <input type="email" name="email" placeholder="email" required />
                <br />
                <input type="password" name="password" placeholder="Password" required />
                <br />
                <button>Login</button>
            </form>
            <br />

            <form onSubmit={handleSignUpForm}>
                <input type="email" name="email" placeholder="email" required />
                <br />
                <input type="password" name="password" placeholder="Password" required />
                <br />
                {/* <input type="password" name='confirmPassword' placeholder="Confirm Password" required /> */}
                <br />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default Learning;
