import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
	[selectShop],
	shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
	[selectCollections],
	collections =>
		collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => 
	createSelector(
		[selectCollections],
		collections => 
			collections ? collections[collectionUrlParam] : null
	);

export const selectIsCollectionsFetching = createSelector(
	[selectShop],
	shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
	[selectCollections],
	/*Using !! to get a truthy or falsy value depending if the collections object is already been loaded*/
	collections => !!collections
);