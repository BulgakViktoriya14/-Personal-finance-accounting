import React from 'react';
import photo from "../../images/profile.png";
import firebase from 'firebase';
import {connect} from "react-redux";
import {setUserNameAction} from "../../actions/actionUserName.js";
import {setUserEmailAction} from "../../actions/actionUserEmail.js";
import {setUserSumAction} from "../../actions/actionSumUser.js";
import {setUserIdAction} from "../../actions/actionIdUser.js";
import {setUserAvatarAction} from "../../actions/actionUserAvatar.js";
import {setUserIncomeCardsAction} from "../../actions/actionUserIncomeCards.js";
import {setUserExpensesCardsAction} from "../../actions/actionUserExpensesCards.js";
import ModalWindow from "../blocks/ModalWindow";
import FormInfoProfile from "./../blocks/FormInfoProfile";

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
							_this.setState({idUser: key});
							_this.props.setUserIdFunction(objectUsers[key].id);
							_this.props.setUserNameFunction(objectUsers[key].name);
							_this.props.setUserEmailFunction(objectUsers[key].email);
							_this.props.setUserSumFunction(objectUsers[key].money);
							_this.props.setUserIncomeCardsFunction(objectUsers[key].cardsIncome);
							_this.props.setUserExpensesCardsFunction(objectUsers[key].cardsExpenses);
						}
					}
				})

				firebase.storage().ref("/avatars").listAll().then(function(result) {
					result.items.forEach(function(image) {
						console.log(image.name, _this.props.userId)
						if(image.name == _this.props.userId)  {
							image.getDownloadURL().then(function(url) {
								_this.props.setUserAvatarFunction(url);
							})
							return;
						}
					});
				}).catch(function(error) {console.log(error)});
			}
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
			email: this.props.userEmail,
			money: this.props.userSum
		});

		firebase.auth().currentUser.updateEmail(this.props.userEmail);
	}

	logout = () => {
		this.props.setUserNameFunction("");
		this.props.setUserEmailFunction("");
		this.props.setUserSumFunction(0);
		firebase.auth().signOut();
		document.location.href = "/login"
	}

	openModalWindowChangePassword = () => {
		document.querySelector(".modal-window.modal-window__change-password").classList.add("open");
	}

	openModalWindowChangePassword = () => {
		document.querySelector(".modal-window.modal-window__change-password").classList.add("open");
	}

	openModalWindowChangeAvatar = () => {
		document.querySelector(".modal-window.modal-window__change-avatar").classList.add("open");
	}

	enableOrDisableCategories = () => {
		this.setState({flagCategory: !this.state.flagCategory});
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
					.then(function () {document.location.href = "/check-in";})
					.catch(error => console.log(error.message));
			}
		)
	}

	render() {
		return (
			<div className="wrapper">
				<ModalWindow page={"profile-password"} nameClass={"modal-window modal-window__change-password"}></ModalWindow>
				<ModalWindow idUser={this.props.userId} page={"profile-avatar"} nameClass={"modal-window modal-window__change-avatar"}></ModalWindow>
				<h1 className="title">Profile</h1>
				<div className="profile">
					<div className="profile__image wrapper-img">
						<img src={this.props.userAvatar ? this.props.userAvatar : photo} alt="photo"/>
					</div>
					<FormInfoProfile handleChange={this.handleChange} flag={this.state.flag} userName={this.props.userName} userEmail={this.props.userEmail}></FormInfoProfile>
				</div>
				<div className="profile__wrapper-buttons">
					{this.state.flag &&
					<button type="button" onClick={this.changeUserInfo} className="button-edit-profile">Change information about yourself</button>
					}
					{!this.state.flag &&
					<button type="button" onClick={this.saveUserInfo} className="button-edit-profile">Save</button>
					}
					<button type="button" onClick={this.openModalWindowChangePassword} className="button-change-password">Change password</button>
					<button type="button" onClick={this.openModalWindowChangeAvatar} className="button-change-avatar">Change avatar</button>
					<button type="button" onClick={this.logout} className="button-logout">Log out</button>
					<button type="button" onClick={this.deleteProfile} className="button-delete-profile">Delete profile</button>
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