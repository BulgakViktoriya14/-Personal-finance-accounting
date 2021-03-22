import React from 'react';
import firebase from 'firebase';
import {NavLink} from 'react-router-dom';

class FormLoginAndCheckIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			money: 0,
			id: ''
		}
	}
	componentDidMount() {
		firebase.database().ref('/users').on('value', snap => {
			this.setState({id: snap.numChildren()});
		});
	}

	handleChange = (e)=> {
		let id = e.target.getAttribute("id");
		let value = e.target.value;
		this.setState({ [id]: value, });
		// if(!e.target.classList.contains("crowded-field") && value !== "") {
		// 	e.target.classList.add("crowded-field");
		// }
		// if(e.target.classList.contains("crowded-field") && value === "") {
		// 	e.target.classList.remove("crowded-field");
		// }
	}

	logIntoAccount = () => {
		const { email, password, name, money } = this.state;
		let _this = this;

		if(this.props.account) {
			firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => document.location.href = "/profile")
			.catch(error => console.log(error));
		} else {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {firebase.database().ref('/users/user' + _this.state.id).set({
				name: name, email: email, money: money, id: _this.state.id
			})}).then(document.querySelector(".modal-window").classList.add("open"))
			.catch(error => console.log(error));
		}
	};

	render() {
		return (
			<form className="form form-login-checkin">
				{!this.props.account &&
					<div className="form__item">
						<label htmlFor="name" className="form__label">Ваше имя</label>
						<input type="text" id="name" className="form__input" name="name-user" requared="requared" onChange={this.handleChange}/>
					</div>
				}
				<div className="form__item">
					<label htmlFor="email" className="form__label">E-mail</label>
				    <input type="email" id="email" name="email" className="form__input" requared="requared" onChange={this.handleChange}/>
				</div>
			    <div className="form__item">
			    	<label htmlFor="password" className="form__label">Пароль</label>
			        <input type="password" id="password" className="form__input" name="password" requared="requared" onChange={this.handleChange}/>
				 </div>
				{!this.props.account &&
				<div className="form__item">
					<label htmlFor="name" className="form__label">Сумма на балансе</label>
					<input type="number" id="money" className="form__input" name="money" onChange={this.handleChange}/>
				</div>
				}
				<div className="form__wrapper-buttons">
				    <input className="form__submit" type="button" name="submit" value={this.props.textButton} onClick={this.logIntoAccount}/>
				  	<NavLink to={this.props.link} className="form__link">{this.props.textLink}</NavLink>
			    </div>
			</form>
		)
	}
}

export default FormLoginAndCheckIn;