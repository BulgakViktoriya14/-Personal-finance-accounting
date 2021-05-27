import React from 'react';
import FormLoginAndCheckIn from './../blocks/FormLoginAndCheckIn';
import ModalWindow from "../blocks/ModalWindow";

class CheckIn extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<ModalWindow history={this.props.history} page={"check-in"} nameClass={"modal-window modal-window__success-check-in"}/>
				<h1 className="title">Registration</h1>
				<FormLoginAndCheckIn link="/login" textLink="Sign in to your account" textButton="Register" account={false}/>
			</div>
		)
	}
}

export default CheckIn;