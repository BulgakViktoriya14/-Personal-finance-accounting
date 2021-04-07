import React from 'react';
import {connect} from 'react-redux';
import firebase from "firebase";
import {setUserExpensesCardsAction} from "../../actions/actionUserExpensesCards.js";
import {setUserIncomeCardsAction} from "../../actions/actionUserIncomeCards.js";
import {setUserSumAction} from "../../actions/actionSumUser";
import close from "../../images/close.svg";
import { v4 as uuidv4 } from 'uuid';
import {validateEmptyField} from "../../functions/validateEmptyField.js";

class CreationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorText: ''
		}
	}

	getDate = () => {
		let now = new Date();
		let dd = now.getDate();
		let mm = now.getMonth() + 1;
		let yy = now.getFullYear();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
	  	if (yy < 10) yy = '0' + yy;
	  
		return dd + '.' + mm + '.' + yy;
	}

	createCard = () => {
		let sum = document.querySelector("#sum").value;
		let category = document.querySelector("#category").value;
		let name = document.querySelector("#name").value;
		let description = document.querySelector("#description").value;
		let date = this.getDate();
		return  {
			title: name,
			money: sum,
			category: category,
			date: date,
			description: description
		}
	}
	checkFields = () => {
		if(this.props.type === "expenses" && Number(document.querySelector("#sum").value) >= Number(this.props.sum)) {
			console.log("Ваш баланс не позвоялет выполнить данную операцию");
			return false;
		}
		return true;
	}

	closePopupCreationCard = () => {
		document.querySelector(".creation-card").classList.remove("creation-card_open");
	}

	addCart = () => {
		let arrayRequiredFields = document.querySelectorAll('input[required]');
		let arrayRequiredFieldsValues = [];
		arrayRequiredFields.forEach(function (elem) {
			arrayRequiredFieldsValues.push(elem.value);
		})
		if(!validateEmptyField(arrayRequiredFieldsValues)) {
			this.setState({errorText: "You did not fill in the required fields"});
			return;
		} else {
			this.setState({errorText: ''});
		}
		// if(!this.checkFields()) return;

		let _this = this;
		let card = this.createCard();

		if(this.props.type === "income") {
			let newSum = Number(this.props.userSum) + Number(card.money);
			let id = uuidv4();
			let path = '/users/user' + _this.props.userId + '/cardsIncome/card' + id;
			firebase.database().ref(path).set({
				category: card.category, date: card.date, money: card.money, title: card.title, description: card.description
			})
				.then(() => {document.querySelector(".form").reset();})
				.then(() => {_this.props.setUserSumFunction(newSum)})
				.then(() => {
					firebase.database().ref('/users/user' + _this.props.userId).update({
						money: newSum
					})
				})
				.then(() => {})
		} else {
			let newSum = Number(this.props.userSum) - Number(card.money);
			let id = uuidv4();
			let path = '/users/user' + _this.props.userId + '/cardsExpenses/card' + id;
			firebase.database().ref(path).set({
				category: card.category, date: card.date, money: card.money, title: card.title, description: card.description
			})
				.then(() => {document.querySelector(".form").reset();})
				.then(() => {_this.props.setUserSumFunction(newSum)})
				.then(() => {
					firebase.database().ref('/users/user' + _this.props.userId).update({
						money: newSum
					})
				})
		}
	}
	  
	render() {
		return (
			<div className="creation-card">
				<button className="close" onClick={this.closePopupCreationCard}><img src={close} alt="close"/></button>
				<h2 className="subtitle">Create card</h2>
				<form className="form form-add-card">
					<div className="form__item">
    					<label htmlFor="name" className="form__label">Title</label>
    					<input type="text" id="name" className="form__input" required="required"/>
    				</div>
					<div className="form__item">
    					<label htmlFor="category" className="form__label">Category</label>
    					<input type="text" id="category" className="form__input"/>
    				</div>
    				<div className="form__item">
    					<label htmlFor="sum" className="form__label">Amount</label>
    					<input type="number" id="sum" className="form__input" required="required"/>
    				</div>
					<div className="form__item">
    					<label htmlFor="description" className="form__label">Description<span className="form__notice">(30 characters)</span></label>
    					<textarea maxLength="30" type="text" id="description" className="form__textarea"></textarea>
    				</div>
    				<input type="button" className="button-add-card" value="Add card" onClick={this.addCart}/>
				</form>
				{this.state.errorText &&
					<p className="massage-error">{this.state.errorText}</p>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		cardsIncome: state.userInfo.cardsIncome,
		cardsExpenses: state.userInfo.cardsExpenses,
		userId: state.userInfo.idUser,
		userSum: state.userInfo.userSum
	}
}


function matchDispatchToProps(dispatch) {
	return {
		setUserIncomeCardsFunction: (userId) => {
			dispatch(setUserIncomeCardsAction(userId))
		},

		setUserExpensesCardsFunction: (cards) => {
			dispatch(setUserExpensesCardsAction(cards))
		},

		setUserSumFunction: (sum) => {
			dispatch(setUserSumAction(sum))
		}
	}
}

export default connect(mapStateToProps, matchDispatchToProps)(CreationCard);