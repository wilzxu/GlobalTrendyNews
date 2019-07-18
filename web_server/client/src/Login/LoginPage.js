import Auth from '../Auth/Auth';
import LoginForm from './LoginForm';
import React from 'react';

class LoginPage extends React.Component {
	constructor() {
		super();
		this.state = {
			error: '',
			user: {
				email: '',
				password: ''
			}
		}
	}

	processForm(event) {
		event.preventDefault();

		const email = this.state.user.email;
		const password = this.state.user.password;

		console.log('response');
		console.log('email:', email);
		console.log('password:', password);
		
	

		// Post login data
		const url = 'http://' + window.location.hostname + '/auth/login';
		const request = new Request(url, {
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

				response.json().then(json => {
					
				    Auth.authenticateUser(json.token, email);
				    
					window.location.replace('/');
				});
			}
			else {
				console.log('Login failed');
				response.json().then(json => {
					const error = json.error ? json.error : '';
					this.setState({ error });
				});
			}
		})
	}

	changeUser(event) {
		const field = event.target.name;
		const user = this.state.user;
		user[field] = event.target.value;

		this.setState({ user });
	}

	render() {
		return (<LoginForm onSubmit = {(e) => this.processForm(e)}
								 onChange = {(e) => this.changeUser(e)}
								 error = {this.state.error}/>
		);
	}
}

export default LoginPage;