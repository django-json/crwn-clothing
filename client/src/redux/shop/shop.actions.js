import { ShopActionTypes } from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage
});

/*The "thunk" function*/
export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		/*Creating the collections reference*/
		const collectionsRef = firestore.collection('collections');
		/*Dispatching the function that will update the reducer's state "isFetching" to true...*/
		dispatch(fetchCollectionsStart());

		/*...Beginning of asynchronous request*/
		collectionsRef
			.get()
			.then(snapshot => {
				const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
				/*Dispatching the function that will update the reducer with payload*/
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch(error => dispatch(fetchCollectionsFailure(error.message))
			);
	}
}



