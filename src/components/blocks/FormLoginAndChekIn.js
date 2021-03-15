import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';

class FormLoginAndChekIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		}
	}

	handleChange = (e)=> {
		let id = e.target.getAttribute("id");
		let value = e.target.value;
		this.setState({ [id]: value, });
		if(!e.target.classList.contains("crowded-field") && value !== "") {
			e.target.classList.add("crowded-field");
		}
		if(e.target.classList.contains("crowded-field") && value === "") {
			e.target.classList.remove("crowded-field");
		}
	}

	logIntoAccount = (e) => {
		e.preventDefault();
		const { email, password } = this.state;

		if(this.props.account) {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => document.location.href = "/profile")
			.catch(error => console.log(error));
		} else {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => document.location.href = "/profile")
			.catch(error => console.log(error));
		}
	};

	render() {
		return (
			<form className="form form-login-checkin">
				<div className="form__item">
				    <input type="email" id="email" name="email" className="form__input" requared="requared" onChange={this.handleChange}/>
				    <label htmlFor="email" className="form__label">E-mail</label>
				</div>
			    <div className="form__item">
			        <input type="password" id="password" className="form__input" name="password" requared="requared" onChange={this.handleChange}/>
			        <label htmlFor="password" className="form__label">Пароль</label>
				 </div>
				<div className="form__wrapper-buttons">
				    <input className="form__submit" type="submit" name="submit" value={this.props.textButton} onClick={this.logIntoAccount}/>
				  	 <NavLink to={this.props.link} className="form__link">{this.props.textLink}</NavLink>
			    </div>
			</form>
		)
	}
}

export default FormLoginAndChekIn;