import React from 'react';

class CreationCard extends React.Component {
	constructor(props) {
		super(props);
		this.addCart = this.addCart.bind(this);
		this.createCard = this.createCard.bind(this);
		this.checkFields = this.checkFields.bind(this);
	}
	getDate() {
		let now = new Date();
		let dd = now.getDate();
		let mm = now.getMonth() + 1;
		let yy = now.getFullYear();

		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
	  	if (yy < 10) yy = '0' + yy;
	  
		return dd + '.' + mm + '.' + yy;
	}
	createCard() {
		let sum = document.querySelector("#sum").value;
		let category = document.querySelector("#category").value;
		let name = document.querySelector("#name").value;
		let description = document.querySelector("#description").value;
		let date = this.getDate();
		return  {
			id: "card",
			name: name, 
			sum: sum, 
			category: category, 
			date: date,
			description: description
		}
	}
	checkFields() {
		if(this.props.type === "expenses" && Number(document.querySelector("#sum").value) >= Number(this.props.sum)) {
			console.log("Ваш баланс не позвоялет выполнить данную операцию");
			return false;
		}
		return true;
	}

	addCart() {
		if(!this.checkFields()) return;
		let card = this.createCard();
		let array = this.props.cards;
		let newArray = array.concat([card]);
		if(this.props.type === "income") {
			return (
				this.props.setCards(newArray),
				this.props.setSum(Number(this.props.sum) + Number(document.querySelector("#sum").value))
			)
		} else {
			return (
				this.props.setCards(newArray),
				this.props.setSum(Number(this.props.sum) - Number(document.querySelector("#sum").value))
			)
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
    					<label htmlFor="description" className="form__label">Описание</label>
    					<textarea type="number" id="description" className="form__input"></textarea>
    				</div>
    				<input type="button" className="button-add-card" value="Добавить карточку" onClick={this.addCart}/>
				</form>
			</div>
		)
	}
}

export default CreationCard;