import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
	/*Converts dollars to cents as stripe accepts cents in USD only*/
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_OpuJwlgxktXkh02Sanqym7Kz00jxlSDzU2';

	const onToken = token => {
		axios({
			method: 'post',
			url: 'payment',
			data: {
				amount: priceForStripe,
				token
			}
		})
			.then(response => {
				alert('Payment successful!');
			})
			.catch(error => {
				alert('Payment error: ', JSON.parse(error));
			}); 
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='CRWN Clothing Ltd.'
			billingAddress
			shippingAddress
			image='https://svgshare.com/i/CUz.svg'
			description={`Your total is $${price}`}
			amount={priceForStripe}
			panelLabel = 'Pay Now'
			token={onToken}
			stripeKey={publishableKey}
		/>
	)
};
export default StripeCheckoutButton;