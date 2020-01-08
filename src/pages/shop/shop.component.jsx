import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
	/*More simplified way to call a state without calling constructor() and super()*/
	state = {
		loading: true
	};

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		const collectionsRef = firestore.collection('collections');

		collectionsRef.get().then(snapshot => {
			console.log(snapshot);

			const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
			updateCollections(collectionsMap);
			/*If updateCollections has updated the collections, set the "isLoading" to false*/
			this.setState({loading: false});
		});
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;
		return( 
			<div className='shop-page'>
				<Route exact
					path={`${match.path}`}
					render={(props) => 
						(<CollectionsOverviewWithSpinner isLoading={loading} {...props}/>)
					} 
				/>
				<Route 
					path={`${match.path}/:collectionId`} 
					render={(props) => 
					  	(<CollectionPageWithSpinner isLoading={loading} {...props}/>)
					}  
				/>
			</div>
		);
	};
};

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);