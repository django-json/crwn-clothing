import React, { useState } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {

	const [userCredentials, setUserCredentials] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async event => {
		//Used to prevent native browser reloads when the form submits
		event.preventDefault();
		//Checks if passwords match
		if(password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		signUpStart({ email, password, displayName });

		//This will clear the form fields after the form submits
		setUserCredentials({
			...userCredentials,
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		});
	};

	const handleChange = event => {
		const { name, value } = event.target;

		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return(
		<div className='sign-up'>
			<h2 className='title'>I do not have an account</h2>
			<span>Sign up with your email and password</span>
				
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					name='displayName'
					type='text'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required
				/>
				<FormInput
					name='email'
					type='email'
					value={email}
					onChange={handleChange}
					label='Email'
					required
				/>
				<FormInput
					name='password'
					type='password'
					value={password}
					onChange={handleChange}
					label='Password'
					required
				/>
				<FormInput
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
				/>

				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);