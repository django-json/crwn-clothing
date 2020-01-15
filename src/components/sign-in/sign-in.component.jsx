import React, { Component } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import './sign-in.styles.scss';

class SignIn extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};
	}

	//Destructure the email and password states and pass it to the action as an argument
	handleSubmit = async event => {
		event.preventDefault();

		const { email, password } = this.state;
		const { emailSignInStart } = this.props;

		emailSignInStart(email, password);
		
		this.setState({ email: '', password: '' });
	}

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	}

	render() {
		const { email, password } = this.state;
		const { googleSignInStart } = this.props;
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
	}
};

const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);