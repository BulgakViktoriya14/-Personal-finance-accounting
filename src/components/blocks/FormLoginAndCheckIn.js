import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {validateEmptyField} from "../../functions/validateEmptyField";
import {validateLengthField} from "../../functions/validateLengthField";
import FieldFormWithoutValue from "../fields/FieldFormWithoutValue";
import FieldFormWithValue from "../fields/FieldFormWithValue";
import {doVisibleOrHiddenPassword} from  "../../functions/doVisibleOrHiddenPassword";

class FormLoginAndCheckIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			money: 1,
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
		doVisibleOrHiddenPassword(e.target);
	}

	logIntoAccount = () => {
		const { email, password, name, money } = this.state;
		let _this = this;
		let flag = validateEmptyField([email, password, name, money]);

		if(this.props.account) {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => this.props.history.push("/profile"))
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
					<FieldFormWithoutValue label={"Your name"} id={"name"} type={"text"} required={true} functionOnChange={this.handleChange}/>
				}
				<FieldFormWithoutValue label={"E-mail"} id={"email"} type={"email"} required={true} functionOnChange={this.handleChange}/>
				<FieldFormWithoutValue label={"Password"} id={"password"} type={"password"} required={true} functionOnChange={this.handleChange} flagPasswordField={true} showHidePassword={this.doVisibleOrHiddenPassword}/>
				{!this.props.account &&
					<FieldFormWithValue type={"number"} label={"Starting amount"} id={"money"} value={this.state.money} functionOnChange={this.handleChange}/>
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