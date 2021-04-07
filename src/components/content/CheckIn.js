import React from 'react';
import FormLoginAndCheckIn from './../blocks/FormLoginAndCheckIn.js';
import ModalWindow from "../blocks/ModalWindow";

class CheckIn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<ModalWindow page={"check-in"} nameClass={"modal-window modal-window__success-check-in"}></ModalWindow>
				<h1 className="title">Registration</h1>
				<FormLoginAndCheckIn link="/login" textLink="Sign in to your account" textButton="Register" account={false}/>
			</div>
		)
	}
}

export default CheckIn;