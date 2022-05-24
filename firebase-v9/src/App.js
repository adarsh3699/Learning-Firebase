import React, { useState } from 'react';
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDtwrqzjyug397_iZptPuBA_xgsRqYNujQ",
    authDomain: "learning-firebase-2b9af.firebaseapp.com",
    projectId: "learning-firebase-2b9af",
    storageBucket: "learning-firebase-2b9af.appspot.com",
    messagingSenderId: "147784663877",
    appId: "1:147784663877:web:930807a84b5d2aafaeb42c"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'bhemu')

// get collection data
getDocs(colRef)
    .then(snapshot => {
        // console.log(snapshot.docs)
        let students = []
        snapshot.docs.forEach(doc => {
            students.push({ ...doc.data(), id: doc.id })
        })
        console.log(students)
    })
    .catch(err => {
        console.log(err.message)
    })

function App() {

    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [idValue, setIdValue] = useState("");

    function handleNameChange(e) {
        setNameValue(e.target.value)
    }

    function handleEmailChange(e) {
        setEmailValue(e.target.value)
    }

    function handleIdChange(e) {
        setIdValue(e.target.value);
    }

    function handleAddBtn(e) {
        e.preventDefault()

        addDoc(colRef, {
            name: nameValue,
            class: emailValue,
        })
            .then(() => {
                console.log("add");
                e.target.reset()
            })
    }

    function handleDeleteBtn(e) {
        e.preventDefault()

        deleteDoc(doc(db, 'bhemu', idValue))
            .then(() => {
                console.log("Delete");
                e.target.reset()
            })
    }

    return (
        <div>
            <h1>Hello World</h1>
            <form onSubmit={handleAddBtn}>
                <input type="text" placeholder="Name" required onChange={handleNameChange} />
                <br />
                <input type="number" placeholder="Class" required onChange={handleEmailChange} />
                <br />
                <button>Add Student</button>
            </form>
            <br />

            <form onSubmit={handleDeleteBtn}>
                <input type="text" placeholder="Id" required onChange={handleIdChange} />
                <br />
                <button>Remove Student</button>
            </form>
        </div>
    );
}

export default App;
