import Auth from '../Auth/Auth';
import SignUpForm from './SignUpForm';
import React from 'react';

class SignUpPage extends React.Component {
	constructor() {
		super();
		this.state = {
			error: '',
			user: {
				email: '',
				password: '',
				confirm_password: '',
			}
		}
	}

	processForm(event) {
		event.preventDefault();

		const email = this.state.user.email;
		const password = this.state.user.password;
		const confirm_password = this.state.user.confirm_password;

		console.log('email:', email);
		console.log('password', password);
		console.log('confirm_password', confirm_password);

		// Post registeration data
		const url = 'http://' + window.location.hostname + '/auth/signup';
		const request = new Request(
			url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.user.email,
					password: this.state.user.password
				})
			});

		fetch(request).then(response => {
			if (response.status === 200) {
				this.setState({
					error: ''
				});
				
				// change the current URL to /
				window.location.replace('/');
			}
			else {
				response.json().then(json => {
					console.log(json);
					const error = json.error ? json.error : '';
					this.setState({ error });
				});
			}
		});
	}

	changeUser(event) {
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;

		this.setState({ user });

		let error = this.state.error;

		if (this.state.user.password !== this.state.user.confirm_password) {
			error = "Password and confirm password don't match.";
		}
		else {
			error = "";
		}

		this.setState({ error });
	}

	render() {
		return (
			<SignUpForm onSubmit = {(e) => this.processForm(e)}
								  onChange = {(e) => this.changeUser(e)}
								  error = {this.state.error}
			/>
		);
	}
}

export default SignUpPage;