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

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;

	//gets the document reference from the specific user through auth.uid
	const userRef = firestore.doc(`users/${userAuth.uid}`);

	//gets the document snapshot from the document reference using the .get() method
	const snapShot = await userRef.get();
	
	//this creates a user data if there is no existing data on this documentRef.

	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		}
		catch(error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;