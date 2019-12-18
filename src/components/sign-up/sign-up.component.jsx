import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends Component{
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
	}

	handleSubmit = async event => {
		//Used to prevent native browser reloads when the form submits
		event.preventDefault();

		//Deconstructs the properties from the state object
		const { displayName, email, password, confirmPassword } = this.state;

		//Checks if passwords match
		if(password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		try {
			//Deconstucts the user property returned by auth after creating a user using .createUserWithEmailAndPassword() built-in auth method.
			const { user } = await auth.createUserWithEmailAndPassword(email, password);

			//Storing data to the firestore
			await createUserProfileDocument(user, { displayName });

			//This will clear the form fields after the form submits
			this.setState({
				displayName: '',
				email: '',
				password: '',
				confirmPassword: ''
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return(
			<div className='sign-up'>
				<h2 className='title'>I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={this.handleSubmit}>
					<FormInput
						name='displayName'
						type='text'
						value={displayName}
						onChange={this.handleChange}
						label='Display Name'
						required
					/>
					<FormInput
						name='email'
						type='email'
						value={email}
						onChange={this.handleChange}
						label='Email'
						required
					/>
					<FormInput
						name='password'
						type='password'
						value={password}
						onChange={this.handleChange}
						label='Password'
						required
					/>
					<FormInput
						name='confirmPassword'
						type='password'
						value={confirmPassword}
						onChange={this.handleChange}
						label='Confirm Password'
						required
					/>

					<CustomButton type='submit'>SIGN UP</CustomButton>
				</form>
			</div>
		)
	}
}
export default SignUp;