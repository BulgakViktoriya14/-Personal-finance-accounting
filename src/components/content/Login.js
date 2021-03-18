import React from 'react';
import FormLoginAndChekIn from './../blocks/FormLoginAndChekIn.js';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Вход в аккаунт</h1>
				<FormLoginAndChekIn link="/check-in" textLink="Создать аккаунт" textButton="Войти" account={true}/>
			</div>
		)
	}
}

export default Login;