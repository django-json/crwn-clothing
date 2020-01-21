import React, { useState } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

const SignIn = ({ googleSignInStart, emailSignInStart}) => {
	//Defining the userCredentials state with its setter using useState hook.
	const [userCredentials, setUserCredentials] = useState({ email: '', password: ''});
	//Destructure the email and password states and pass it to the action as an argument
	const { email, password } = userCredentials;
	
	const handleSubmit = async event => {
		event.preventDefault();

		emailSignInStart(email, password);
		
		setUserCredentials({ ...userCredentials, email: '', password: '' });
	};

	const handleChange = event => {
		const { name, value } = event.target;

		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<div className='sign-in'>
			<h2 className='title'>I already have an account</h2>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput 
					name='email' 
					type='email' 
					value={email}
					handleChange={handleChange}
					label='email'
				/>
				<FormInput 
					name='password' 
					type='password' 
					value={password}
					handleChange={handleChange}
					label='password'
				/>
				<div className='buttons'>
					<CustomButton 
						type='submit' 
						name='submit'
					>
					SIGN IN
					</CustomButton>
					<CustomButton 
						type='button'
						onClick={googleSignInStart}
						isGoogleSignIn
					>
					Sign-in with Google
					</CustomButton>
				</div>
			</form>
		</div>
	);
};
const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);