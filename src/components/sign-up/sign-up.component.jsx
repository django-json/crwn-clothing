import React, { Component } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

class SignUp extends Component{
	constructor() {
		super();

		this.state = {
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
			success: false
		};
	}
	//Create actiontypes for: signupstart, signupsuccess, signupfailure
	//Create actions for each types.
	//Update the user reducer
	//Dispatch the action cue (signupstart)
	//Create a based saga (listener)
	//Create the saga that will execute the signup process to firebase

	handleSubmit = async event => {
		//Used to prevent native browser reloads when the form submits
		event.preventDefault();
		const { signUpStart } = this.props;
		//Deconstructs the properties from the state object
		const { displayName, email, password, confirmPassword } = this.state;
		//Checks if passwords match
		if(password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}

		signUpStart({ email, password, displayName });

		//This will clear the form fields after the form submits
		this.setState({
			displayName: '',
			email: '',
			password: '',
			confirmPassword: '',
			success: true
		});
	};

	handleChange = event => {
		const { name, value } = event.target;

		this.setState({ [name]: value });
	};

	render() {
		const { displayName, email, password, confirmPassword, success } = this.state;
		return(
			<div className='sign-up'>
				<h2 className='title'>I do not have an account</h2>
				{
					success ? (
						<span className='success'>Sign up sucessfull!</span>
					):( 
						<span>Sign up with your email and password</span>
					)
				}
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
};

const mapDispatchToProps = dispatch => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);