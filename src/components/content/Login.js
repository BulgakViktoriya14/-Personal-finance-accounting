import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';

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
					    <input className="form__submit" type="submit" name="submit" value="Войти" onClick={this.logIntoAccount}/>
					    <NavLink to="/check-in" className="form__link">Создать аккаунт</NavLink>
				    </div>
				</form>
			</div>
		)
	}
}

export default Login;