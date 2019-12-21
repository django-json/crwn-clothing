import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = this.state;

		try {
			//passing email and password to firebase auth .signInWithEmailAndPassword() method with await which waits for the promised to be returned
			await auth.signInWithEmailAndPassword(email, password);

			//clears the form fields when the form submits
			this.setState({ email: '', password: '' });

		} catch (error) {
			console.log(error);
		}
		
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	}

	render() {
		const { email, password } = this.state;
		return (
			<div className='sign-in'>
				<h2 className='title'>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput 
						name='email' 
						type='email' 
						value={email}
						handleChange={this.handleChange}
						label='email'
					/>
					<FormInput 
						name='password' 
						type='password' 
						value={password}
						handleChange={this.handleChange}
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
							onClick={signInWithGoogle}
							isGoogleSignIn
						>
						Sign-in with Google
						</CustomButton>
					</div>
				</form>
			</div>
		);
	}
}
export default SignIn;