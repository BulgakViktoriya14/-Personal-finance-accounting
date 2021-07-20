import React from 'react';
import photo from "../../images/profile.png";
import firebase from 'firebase';
import {connect} from "react-redux";
import {setUserNameAction} from "../../actions/actionUserName";
import {setUserEmailAction} from "../../actions/actionUserEmail";
import {setUserSumAction} from "../../actions/actionSumUser";
import {setUserIdAction} from "../../actions/actionIdUser";
import {setUserAvatarAction} from "../../actions/actionUserAvatar";
import {setUserIncomeCardsAction} from "../../actions/actionUserIncomeCards";
import {setUserExpensesCardsAction} from "../../actions/actionUserExpensesCards";
import ModalWindow from "../blocks/ModalWindow";
import FormInfoProfile from "./../blocks/FormInfoProfile";
import ButtonProfile from "../buttons/ButtonProfile";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: true,
			idUser: '',
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
							_this.setState({idUser: objectUsers[key].id});
							_this.props.setUserIdFunction(objectUsers[key].id);
							_this.props.setUserNameFunction(objectUsers[key].name);
							_this.props.setUserEmailFunction(objectUsers[key].email);
							_this.props.setUserSumFunction(objectUsers[key].money);
							_this.props.setUserIncomeCardsFunction(objectUsers[key].cardsIncome);
							_this.props.setUserExpensesCardsFunction(objectUsers[key].cardsExpenses);
							_this.getAvatar(objectUsers[key].id);
						}
					}
				})
			}
		})
	}

	getAvatar = (userId) => {
		let _this = this;
		firebase.storage().ref(`/avatars/${userId}`).getDownloadURL()
			.then(function (url) {
				_this.props.setUserAvatarFunction(url);
			})
	}

	changeUserInfo = () => {
		this.setState({ flag: !this.state.flag } );
	}

	saveUserInfo = () => {
		const db = firebase.database();
		this.setState({ flag: !this.state.flag } );

		db.ref('/users/user' + this.state.idUser).update({
			name: this.props.userName,
			email: this.props.userEmail
		})

		firebase.auth().currentUser.updateEmail(this.props.userEmail);
	}

	logout = () => {
		this.props.setUserNameFunction("");
		this.props.setUserEmailFunction("");
		this.props.setUserSumFunction(0);
		firebase.auth().signOut();
		this.props.history.push('/login');
	}

	openModalWindowChangePassword = () => {
		document.querySelector(".modal-window.modal-window__change-password").classList.add("open");
	}

	openModalWindowChangeAvatar = () => {
		document.querySelector(".modal-window.modal-window__change-avatar").classList.add("open");
	}

	handleChange = (e) => {
		switch (e.target.name) {
			case 'name-user':
				this.props.setUserNameFunction(e.target.value);
				break;
			case 'email':
				this.props.setUserEmailFunction(e.target.value);
				break;
			default:
				break;
		}
	}

	deleteProfile = () => {
		let _this = this;
		firebase.auth().currentUser.delete().then(function() {
				firebase.database().ref('users/user' + _this.props.userId).remove()
					.then(function () {this.props.history.push('/check-in')})
					.catch(error => console.log(error.message));
			}
		)
	}

	render() {
		return (
			<div className="wrapper">
				<ModalWindow page={"profile-password"} nameClass={"modal-window modal-window__change-password"}/>
				<ModalWindow idUser={this.props.userId} page={"profile-avatar"} nameClass={"modal-window modal-window__change-avatar"} history={this.props.history}/>
				<h1 className="title">Profile</h1>
				<div className="profile">
					<div className="profile__image wrapper-img">
						<img src={this.props.userAvatar ? this.props.userAvatar : photo} alt="photo"/>
					</div>
					<FormInfoProfile handleChange={this.handleChange} flag={this.state.flag} userName={this.props.userName} userEmail={this.props.userEmail}/>
				</div>
				<div className="profile__wrapper-buttons">
					{this.state.flag &&
						<ButtonProfile functionOnCLick={this.changeUserInfo} nameButton={"Change information about yourself"}/>
					}
					{!this.state.flag &&
						<ButtonProfile functionOnCLick={this.saveUserInfo} nameButton={"Save"}/>
					}
					<ButtonProfile functionOnCLick={this.openModalWindowChangePassword} nameButton={"Change password"}/>
					<ButtonProfile functionOnCLick={this.openModalWindowChangeAvatar} nameButton={"Change avatar"}/>
					<ButtonProfile functionOnCLick={this.logout} nameButton={"Log out"}/>
					<ButtonProfile functionOnCLick={this.deleteProfile} nameButton={"Delete profile"}/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userId: state.userInfo.idUser,
		userName: state.userInfo.userName,
		userEmail: state.userInfo.userEmail,
		userSum: state.userInfo.userSum,
		userAvatar: state.userInfo.userAvatar,
	}
}

function matchDispatchToProps(dispatch) {
	return {
		setUserIdFunction: (userId) => {
			dispatch(setUserIdAction(userId))
		},

		setUserAvatarFunction: (userAvatar) => {
			dispatch(setUserAvatarAction(userAvatar))
		},

		setUserNameFunction: (userName) => {
			dispatch(setUserNameAction(userName))
		},

		setUserEmailFunction: (email) => {
			dispatch(setUserEmailAction(email))
		},

		setUserSumFunction: (sum) => {
			dispatch(setUserSumAction(sum))
		},

		setUserIncomeCardsFunction: (cards) => {
			dispatch(setUserIncomeCardsAction(cards))
		},

		setUserExpensesCardsFunction: (cards) => {
			dispatch(setUserExpensesCardsAction(cards))
		}
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(Profile);