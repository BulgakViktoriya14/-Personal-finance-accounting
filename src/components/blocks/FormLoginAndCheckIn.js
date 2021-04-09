import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {validateEmptyField} from "../../functions/validateEmptyField";
import {validateLengthField} from "../../functions/validateLengthField";

class FormLoginAndCheckIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			money: 0,
			id: '',
			errorText: ''
		}
	}

	handleChange = (e)=> {
		let id = e.target.getAttribute("id");
		let value = e.target.value;
		this.setState({ [id]: value, });
	}

	doVisibleOrHiddenPassword = (e) => {
		e.preventDefault();
		if(e.target.classList.contains("button-hidden-password")) {
			e.target.classList.remove("button-hidden-password");
			e.target.previousElementSibling.setAttribute("type", "password");
		} else {
			e.target.classList.add("button-hidden-password");
			e.target.previousElementSibling.setAttribute("type", "text");
		}
	}

	logIntoAccount = () => {
		const { email, password, name, money } = this.state;
		let _this = this;
		let flag = validateEmptyField([email, password, name, money]);

		if(this.props.account) {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => document.location.href = "/profile")
			.catch(error => _this.setState({errorText: error.message}));
		} else {
			if (!flag) {
				this.setState({errorText: "You have not completed the fields"});
				return;
			}

			if(!validateLengthField("text", name)) {
				this.setState({errorText: "Incorrectly entered Name (at least 3 characters)"});
				return;
			}

			if(!validateLengthField("email", email)) {
				this.setState({errorText: "Invalid email address"});
				return;
			}

			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				let id = uuidv4();
				firebase.database().ref('/users/user' + id).set({
					name: name, email: email, money: money, id: id
				})
				document.querySelector(".modal-window").classList.add("open")
			}).catch(error => _this.setState({errorText: error.message}));
		}
	}

	setNewPassword = (e) => {
		e.preventDefault();
		document.querySelector(".modal-window__forgot-password").classList.add("open");
	}

	render() {
		return (
			<form className="form form-login-checkin">
				{!this.props.account &&
					<div className="form__item">
						<label htmlFor="name" className="form__label required">Your name</label>
						<input type="text" id="name" className="form__input" name="name-user" required="required" onChange={this.handleChange}/>
					</div>
				}
				<div className="form__item">
					<label htmlFor="email" className="form__label required">E-mail</label>
				    <input type="email" id="email" name="email" className="form__input" required="required" onChange={this.handleChange}/>
				</div>
			    <div className="form__item">
			    	<label htmlFor="password" className="form__label required">Password</label>
			        <input type="password" id="password" className="form__input" name="password" required="required" onChange={this.handleChange}/>
					<button className="button-visible-password" onClick={this.doVisibleOrHiddenPassword}></button>
			    </div>
				{!this.props.account &&
				<div className="form__item">
					<label htmlFor="name" className="form__label">Starting amount</label>
					<input type="number" id="money" className="form__input" name="money" value={this.state.money} onChange={this.handleChange}/>
				</div>
				}
				<div className="form__wrapper-buttons">
				    <input className="form__submit" type="button" name="submit" value={this.props.textButton} onClick={this.logIntoAccount}/>
				  	<div className="form__wrapper-link">
						<NavLink to={this.props.link} className="form__link">{this.props.textLink}</NavLink>
						{this.props.account &&
							<button className="form__link button" onClick={this.setNewPassword}>Forgot your password?</button>
						}
					</div>

			    </div>
				{this.state.errorText &&
					<p className="massage-error">{this.state.errorText}</p>
				}
			</form>
		)
	}
}

export default FormLoginAndCheckIn;