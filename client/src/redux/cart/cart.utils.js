export const addItemToCart = (cartItems, cartItemToAdd) => {
	/*
		If a new cart item to be added exists in the cart items already, that cart item will be stored in the existingCartItem variable which will be used for future condition.
	*/
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToAdd.id
	);

	/*
		If existingCartItem is not undefined, .map() modifies the quantity by adding 1 to that specific cartItem's quantity that meets the condition.
	*/
	if(existingCartItem) {
		return cartItems.map(cartItem => 
			cartItem.id === cartItemToAdd.id ? 
				{ ...cartItem, quantity: cartItem.quantity + 1 }
			: 	cartItem
		);
	}

	/*
		Else if existingCartItem is undefined, return the existing cart items with the new cart item object which has a new property quantity of 1 as a base quantity value.
	*/
	return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === cartItemToRemove.id
	);

	/*
		If existing cart item has a quantity of 1, then it will be removed from the checkout items
	*/
	if(existingCartItem.quantity === 1) {
		return cartItems.filter(
			cartItem => cartItem.id !== cartItemToRemove.id
		);
	}

	/*
		Else, the quantity of that cart item will decrease by 1 instead.
	*/
	return cartItems.map(cartItem => 
		cartItem.id === cartItemToRemove.id ?
			{ ...cartItem, quantity: cartItem.quantity - 1}
		: 	cartItem
	)
};