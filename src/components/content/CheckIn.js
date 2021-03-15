import React from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';
import FormLoginAndChekIn from './../blocks/FormLoginAndChekIn.js';

class CheckIn extends React.Component {
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

	createAccount = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => this.props.history.push('/profile'))
		.catch(error => console.log(error));
	};

	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Регистрация</h1>
				<FormLoginAndChekIn link="/login" textLink="Войти в аккаунт" textButton="Зарегестироваться"/>
			</div>
		)
	}
}

export default CheckIn;