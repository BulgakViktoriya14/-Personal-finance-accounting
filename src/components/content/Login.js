import React from 'react';
import FormLoginAndChekIn from '../blocks/FormLoginAndCheckIn.js';
import ModalWindow from "../blocks/ModalWindow";

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<ModalWindow page={"page-login"} nameClass={"modal-window modal-window__forgot-password"}></ModalWindow>
				<h1 className="title">Login to your account</h1>
				<FormLoginAndChekIn link="/check-in" textLink="Create an account" textButton="Login" account={true}/>
			</div>
		)
	}
}

export default Login;