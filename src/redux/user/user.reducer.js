import { UserActionTypes } from './user.types'; 

const INITIAL_STATE = {
	currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER:
			// The new user is stored in the payload.
			return {
				...state,
				currentUser: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;