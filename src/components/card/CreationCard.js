import React from 'react';
import {connect} from 'react-redux';
import firebase from "firebase";
import {setUserExpensesCardsAction} from "../../actions/actionUserExpensesCards.js";
import {setUserIncomeCardsAction} from "../../actions/actionUserIncomeCards.js";
import {setUserSumAction} from "../../actions/actionSumUser";

class CreationCard extends React.Component {
	constructor(props) {
		super(props);
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

	addCart = () => {
		if(!this.checkFields()) return;

		let _this = this;
		let card = this.createCard();

		if(this.props.type === "income") {
			let newSum = Number(this.props.userSum) + Number(card.money);
			let cards = this.props.cardsIncome;
			let path;
			if(cards) {
				path = '/users/user' + _this.props.userId + '/cardsIncome/card' + Object.keys(cards).length;
			} else {
				path = '/users/user' + _this.props.userId + '/cardsIncome/card0';
			}
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
			let cards = this.props.cardsExpenses;
			let path;
			if(cards) {
				path = '/users/user' + _this.props.userId + '/cardsExpenses/card' + Object.keys(cards).length;
			} else {
				path = '/users/user' + _this.props.userId + '/cardsExpenses/card0';
			}
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
				<h2 className="subtitle">Создать карточку</h2>
				<form className="form form-add-card">
					<div className="form__item">
    					<label htmlFor="name" className="form__label">Название</label>
    					<input type="text" id="name" className="form__input"/>
    				</div>
					<div className="form__item">
    					<label htmlFor="category" className="form__label">Категория</label>
    					<input type="text" id="category" className="form__input"/>
    				</div>
    				<div className="form__item">
    					<label htmlFor="sum" className="form__label">Сумма</label>
    					<input type="number" id="sum" className="form__input"/>
    				</div>
					<div className="form__item">
    					<label htmlFor="description" className="form__label">Описание<span className="form__notice">(30 символов)</span></label>
    					<textarea maxLength="30" type="text" id="description" className="form__textarea"></textarea>
    				</div>
    				<input type="button" className="button-add-card" value="Добавить карточку" onClick={this.addCart}/>
				</form>
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