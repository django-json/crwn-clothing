import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = event => {
		event.preventDefault();

		this.setState({ email: '', password: '' });
	}

	handleChange = event => {
		const { name, value } = event;

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
							type='button' 
							name='submit'
						>
						Submit Form
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