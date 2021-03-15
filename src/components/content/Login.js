import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';
import FormLoginAndChekIn from './../blocks/FormLoginAndChekIn.js';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	componentDidMount() {
		const db = firebase.database();
	}

	handleChange = ({target: {value, id}}) => {
		this.setState({ [id]: value, });
	}

	logIntoAccount = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => this.props.history.push('/profile'))
		.catch(error => console.log(error));
	};

	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Вход в аккаунт</h1>
				<FormLoginAndChekIn link="/check-in" textLink="Создать аккаунт" textButton="Войти"/>
			</div>
		)
	}
}

export default Login;