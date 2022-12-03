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

import { getAuth } from 'firebase/auth';

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

// get collection data
// getDocs(colRef)
//     .then(snapshot => {
//         // console.log(snapshot.docs)
//         let students = []
//         snapshot.docs.forEach(doc => {
//             students.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(students)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

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
    function handleAddBtn(e) {
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

    function handleDeleteBtn(e) {
        e.preventDefault();

        deleteDoc(doc(db, 'bhemu', e.target.id.value)).then(() => {
            console.log('Delete');
            e.target.reset();
        });
    }

    function handleUpdateBtn(e) {
        e.preventDefault();

        updateDoc(doc(db, 'bhemu', e.target.id.value), {
            name: e.target.name.value,
        }).then(() => {
            console.log('Updated');
            e.target.reset();
        });
    }

    return (
        <div id="app">
            <h1>Hello World</h1>
            <form onSubmit={handleAddBtn}>
                <input type="text" name="name" placeholder="Name" required />
                <br />
                <input type="number" name="class" placeholder="Class" required />
                <br />
                <button>Add Student</button>
            </form>
            <br />

            <form onSubmit={handleUpdateBtn}>
                <input type="text" name="id" placeholder="Id" required />
                <br />
                <input type="text" name="name" placeholder="Name" required />
                <br />
                <button>Update Student</button>
            </form>
            <br />

            <form onSubmit={handleDeleteBtn}>
                <input type="text" placeholder="Id" name="id" required />
                <br />
                <button>Remove Student</button>
            </form>
        </div>
    );
}

export default Learning;
