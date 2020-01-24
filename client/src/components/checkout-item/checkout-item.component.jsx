import React from 'react';

import { connect } from 'react-redux';

import { clearItemFromCart } from '../../redux/cart/cart.actions';
import { removeItem } from '../../redux/cart/cart.actions';
import { addItem } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	return (
		<div className='checkout-item'>
			<div className='image-container'>
				<img src={imageUrl} alt='item'/>
			</div>
			<div className='name'>{name}</div>
			<div className='quantity'>
				<div 
					onClick={() => removeItem(cartItem)}
					className='arrow'
				>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>
				<div 
					onClick={() => addItem(cartItem)}
					className='arrow'
				>
					&#10095;
				</div>
			</div>
			<div className='price'>${price}</div>
			<div 
				className='remove-button'
				onClick={() => clearItem(cartItem)}
			>
				&#10005;
			</div>
		</div>
	)
};

const mapDispatchToProps = dispatch => ({
	clearItem: item => dispatch(clearItemFromCart(item)),
	addItem: item => dispatch(addItem(item)),
	removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);