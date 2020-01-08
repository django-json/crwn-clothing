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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	
	/*Instantiate the firestore's batch object to set the whole objects in one set*/
	const batch = firestore.batch();
	/*Looping through the objects and set each object (document to be added to firestore) its own id with batch.set()*/
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});

	/*	.commit() will fire off batch request
		It returns a promise. When commit succeeds, it will come back and resolve a void value (null value) which can be used to handle error when we call addCollectionAndDocuments function and chain .then()
	*/
	return await batch.commit();
};

/*Maps the collection snapshot to add the routeName property with its value and assign the id created by firestore to the id property and other properties so the new converted collections from firestore will have all the necessary properties which will be used in the app*/
export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
	const transformedCollections = collectionsSnapshot.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	});

	return transformedCollections.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;