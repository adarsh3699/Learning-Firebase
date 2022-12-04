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
    // where,
    orderBy,
    serverTimestamp,
    getDoc,
} from 'firebase/firestore';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDtwrqzjyug397_iZptPuBA_xgsRqYNujQ',
    databaseURL: 'https://learning-firebase-2b9af-default-rtdb.firebaseio.com',
    projectId: 'learning-firebase-2b9af',
    storageBucket: 'learning-firebase-2b9af.appspot.com',
    messagingSenderId: '147784663877',
    appId: '1:147784663877:web:930807a84b5d2aafaeb42c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore();

const auth = getAuth();

getAnalytics(app);

// collection ref
const colRef = collection(database, 'user');

function getData() {
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

function getRealTimeData() {
    const getDataQuery = query(colRef, orderBy('createdAt')); // orderBy('name', 'desc || ase')

    onSnapshot(
        // colRef,
        getDataQuery,
        (snapshot) => {
            let user = [];

            snapshot.docChanges().forEach((change) => {
                console.log(change.type);
            });

            snapshot.docs.forEach((doc) => {
                user.push({ ...doc.data(), id: doc.id });
            });
            console.log(user);
        },
        (error) => {
            console.log(error);
        }
    );
    // ka()
}

function getDocument(e) {
    e.preventDefault();

    const docRef = doc(database, 'user', e.target.id.value);
    getDoc(docRef)
        .then((doc) => {
            console.log(doc.data(), doc.id);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function addData(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const roll = e.target.roll.value;

    addDoc(colRef, {
        name: name,
        roll: roll,
        createdAt: serverTimestamp(),
    })
        .then(() => {
            console.log('dataAdded');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function deleteData(e) {
    e.preventDefault();

    const docRef = doc(database, 'user', e.target.id.value);

    deleteDoc(docRef)
        .then(() => {
            console.log('documentDeleted');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function updateDocument(e) {
    e.preventDefault();

    const docRef = doc(database, 'user', e.target.id.value);

    updateDoc(docRef, {
        name: e.target.name.value,
    })
        .then(() => {
            console.log('Document Updated');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function handleSignUpForm(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created:|', cred.user);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function handleLoginForm(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user signed: ', cred.user);
        })
        .catch((err) => {
            console.log(err.message);
        });
}

function handleSignOut() {
    signOut(auth)
        .then(() => {
            console.log('sgin out');
        })
        .catch((err) => {
            console.log(err.message);
        });
}

onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user);
});

export {
    getData,
    getRealTimeData,
    handleSignUpForm,
    handleLoginForm,
    addData,
    deleteData,
    getDocument,
    updateDocument,
    handleSignOut,
};
