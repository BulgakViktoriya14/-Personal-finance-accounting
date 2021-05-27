import React from 'react';
import FormLoginAndCheсkIn from '../blocks/FormLoginAndCheckIn';
import ModalWindow from "../blocks/ModalWindow";

class Login extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<ModalWindow history={this.props.history} page={"page-login"} nameClass={"modal-window modal-window__forgot-password"}/>
				<h1 className="title">Login to your account</h1>
				<FormLoginAndCheсkIn link="/check-in" textLink="Create an account" textButton="Login" account={true}/>
			</div>
		)
	}
}

export default Login;