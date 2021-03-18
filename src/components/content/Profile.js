import React from 'react';
import photo from "../../images/profile.png";
import firebase from 'firebase';
import {connect} from "react-redux";
import {setUserNameAction} from "../../actions/actionUserName.js";
import {setUserEmailAction} from "../../actions/actionUserEmail.js";
import {setUserSumAction} from "../../actions/actionSumUser.js";
import ModalWindow from "../blocks/ModalWindow";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: true,
			idUser: ''
		}
	}

	componentDidMount() {
		const db = firebase.database();
		let _this = this;

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				let currentEmail = user.email;
				db.ref('/users').on('value', snap => {
					let objectUsers = snap.val();
					for (let key in objectUsers) {
						if (currentEmail === objectUsers[key].email) {
							_this.setState({idUser: key});
							_this.props.setUserNameFunction(objectUsers[key].name);
							_this.props.setUserEmailFunction(objectUsers[key].email);
							_this.props.setUserSumFunction(objectUsers[key].money);
						}
					}
				})
			}
		})
	}

	changeUserInfo = () => {
		this.setState({ flag: !this.state.flag } );
	}

	saveUserInfo = () => {
		const db = firebase.database();
		this.setState({ flag: !this.state.flag } );

		db.ref('/users/' + this.state.idUser).set({
			name: this.props.userName,
			email: this.props.userEmail,
			money: this.props.userSum
		});
	}

	logout = () => {
		this.props.setUserNameFunction("");
		this.props.setUserEmailFunction("");
		this.props.setUserSumFunction(0);
		firebase.auth().signOut();
		document.location.href = "/login"
	}

	openModalWindow = () => {
		document.querySelector(".modal-window").classList.add("open");
	}

	handleChange = (e) => {
		switch (e.target.name) {
			case 'name-user':
				this.props.setUserNameFunction(e.target.value);
				break;
			case 'email':
				this.props.setUserEmailFunction(e.target.value);
				break;
			case 'money':
				this.props.setUserSumFunction(e.target.value);
				break;
		}
	}

	render() {
		return (
			<div className="wrapper">
				<ModalWindow title={"Изменить пароль"}></ModalWindow>
				<h1 className="title">Профиль</h1>
				<div className="profile">
					<div className="profile__image wrapper-img">
						<img src={photo} alt="photo"/>
					</div>
					<form className="form profile__info-form">
						<div className="form__item">
							<label htmlFor="name-user" className="form__label">Имя Фамилия</label>
							<input type="text" id="name-user" name="name-user" className="form__input"
								   readOnly={this.state.flag} value={this.props.userName} onChange={this.handleChange}/>
						</div>
						<div className="form__item">
							<label htmlFor="email" className="form__label">E-mail</label>
							<input type="email" id="email" name="email" className="form__input"
								   readOnly={this.state.flag} value={this.props.userEmail} onChange={this.handleChange}/>
						</div>
						<div className="form__item">
							<label htmlFor="money" className="form__label">Остаток на счету</label>
							<input type="number" id="money" name="money" className="form__input"
								   readOnly={this.state.flag} value={this.props.userSum} onChange={this.handleChange}/>
						</div>
					</form>
				</div>
				<div className="profile__wrapper-buttons">
					{this.state.flag &&
					<button type="button" onClick={this.changeUserInfo} className="button-edit-profile">Редактировать
						профиль</button>
					}
					{!this.state.flag &&
					<button type="button" onClick={this.saveUserInfo} className="button-edit-profile">Сохранить</button>
					}
					<button type="button" onClick={this.openModalWindow} className="button-change-password">Изменить пароль</button>
					<button type="button" onClick={this.logout} className="button-logout">Выйти</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userName: state.userInfo.userName,
		userEmail: state.userInfo.userEmail,
		userSum: state.userInfo.userSum
	}
}

function matchDispatchToProps(dispatch) {
	return {
		setUserNameFunction: (userName) => {
			dispatch(setUserNameAction(userName))
		},

		setUserEmailFunction: (email) => {
			dispatch(setUserEmailAction(email))
		},

		setUserSumFunction: (sum) => {
			dispatch(setUserSumAction(sum))
		}
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);