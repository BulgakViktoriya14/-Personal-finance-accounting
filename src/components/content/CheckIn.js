import React from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';

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
				<form className="form">
					<div className="form__item">
				      <label htmlFor="email" className="form__label">E-mail</label>
				      <input type="email" id="email" name="email" className="form__input" requared="true" onChange={this.handleChange}/>
				    </div>
				    <div className="form__item">
				      <label htmlFor="password" className="form__label">Пароль</label>
				      <input type="password" id="password" className="form__input" name="password" requared="true" onChange={this.handleChange}/>
				    </div>
				    <div className="form__wrapper-buttons">
					    <input className="form__submit" type="submit" name="submit" value="Зарегистрироваться" onClick={this.createAccount}/>
					    <NavLink to="/login" className="form__link">Войти в аккаунт</NavLink>
				    </div>
				</form>
			</div>
		)
	}
}

export default CheckIn;