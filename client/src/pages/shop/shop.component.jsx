import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

class ShopPage extends Component {

	componentDidMount() {
		const { fetchCollectionsStartAsync } = this.props;
		/*Call the fetchCollectionsStartAsync function the moment the component mounts*/
		fetchCollectionsStartAsync();
	}

	render() {
		const { match } = this.props;
		return( 
			<div className='shop-page'>
				<Route exact
					path={`${match.path}`}
					component={CollectionsOverviewContainer} 
				/>
				<Route 
					path={`${match.path}/:collectionId`} 
					component={CollectionPageContainer} 
				/>
			</div>
		);
	};
};

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);