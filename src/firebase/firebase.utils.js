import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC_jdWXsjJRziIRDUB9WlT_vlUldWUDKQk",
    authDomain: "crwn-db-ea6c0.firebaseapp.com",
    databaseURL: "https://crwn-db-ea6c0.firebaseio.com",
    projectId: "crwn-db-ea6c0",
    storageBucket: "crwn-db-ea6c0.appspot.com",
    messagingSenderId: "277706239604",
    appId: "1:277706239604:web:b731a488ddd0b2c3162b21",
    measurementId: "G-ZTT9N8HNXL"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;