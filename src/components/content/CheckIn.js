import React from 'react';
import FormLoginAndChekIn from './../blocks/FormLoginAndChekIn.js';

class CheckIn extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Регистрация</h1>
				<FormLoginAndChekIn link="/login" textLink="Войти в аккаунт" textButton="Зарегестироваться" account={false}/>
			</div>
		)
	}
}

export default CheckIn;