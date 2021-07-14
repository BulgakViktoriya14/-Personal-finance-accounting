import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {validateEmptyField} from "../../functions/validateEmptyField";
import {validateLengthField} from "../../functions/validateLengthField";
import FieldFormWithoutValue from "../fields/FieldFormWithoutValue";
import FieldFormWithValue from "../fields/FieldFormWithValue";
import {doVisibleOrHiddenPassword} from  "../../functions/doVisibleOrHiddenPassword";
import styled from "styled-components";
import {btnDefault} from "../style-components/buttonStyle";
import {linkStyle} from "../style-components/linkStyle";
import {messageErrorStyle} from "../style-components/messageErrorStyle";
import {variablesStyle} from '../style-components/variablesStyle';

const MessageErrorStyle = styled(messageErrorStyle)``;

const FormWrapperStyle = styled.div`
	display: flex;
    flex-basis: 100%;
    justify-content: space-between;
    align-items: center;
    margin: 25px 0 0 0;
`;

const FormWrapperLinkStyle = styled.div`
	display: flex;
    flex-direction: column;
`;

const BtnDefault = styled(btnDefault)`
	box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2);
`;

const FormLogin = styled.form`
	display: flex;
  	flex-direction: column;
    flex-basis: 50%;
    max-width: 500px;
    margin: 0 auto;
    
    @media screen and (max-width: 768px) {
       .form__wrapper-buttons {
           margin: 0;
           flex-wrap: wrap;
       }

       .form__item {
            margin: 0 0 30px 0;
            padding: 0;
       }

        .form__submit,
        .form__link {
            margin: 0 0 10px 0;
        }
    }
`;

const BtnForgot = styled(linkStyle)`
	color: ${variablesStyle.colors.colorRed};
	font-weight: bold;
	cursor: pointer;
 `;

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
			<FormLogin className="form form-login-checkin">
				{!this.props.account &&
					<FieldFormWithoutValue label={"Your name"} id={"name"} type={"text"} required={true} functionOnChange={this.handleChange}/>
				}
				<FieldFormWithoutValue label={"E-mail"} id={"email"} type={"email"} required={true} functionOnChange={this.handleChange}/>
				<FieldFormWithoutValue label={"Password"} id={"password"} type={"password"} required={true} functionOnChange={this.handleChange} flagPasswordField={true} showHidePassword={this.doVisibleOrHiddenPassword}/>
				{!this.props.account &&
					<FieldFormWithValue type={"number"} label={"Starting amount"} id={"money"} value={this.state.money} functionOnChange={this.handleChange}/>
				}
				<FormWrapperStyle className="form__wrapper-buttons">
					<BtnDefault className="form__submit" onClick={this.logIntoAccount}>{this.props.textButton}</BtnDefault>
				  	<FormWrapperLinkStyle className="form__wrapper-link">
						<NavLink to={this.props.link} className="form__link">{this.props.textLink}</NavLink>
						{this.props.account &&
							<BtnForgot className="form__link button" onClick={this.setNewPassword}>Forgot your password?</BtnForgot>
						}
					</FormWrapperLinkStyle>
			    </FormWrapperStyle>
				{this.state.errorText &&
					<MessageErrorStyle className="massage-error">{this.state.errorText}</MessageErrorStyle>
				}
			</FormLogin>
		)
	}
}

export default FormLoginAndCheckIn;