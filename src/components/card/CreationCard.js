import React from 'react';

class CreationCard extends React.Component {
	constructor(props) {
		super(props);
		this.addCart = this.addCart.bind(this);
		this.createCard = this.createCard.bind(this);
		this.checkFields = this.checkFields.bind(this);
	}

	createCard() {
		console.log("create");
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
		if(this.props.type === "income") {
			this.createCard();
			return this.props.setSum(Number(this.props.sum) + Number(document.querySelector("#sum").value));
		} else {
			this.createCard();
			return this.props.setSum(Number(this.props.sum) - Number(document.querySelector("#sum").value));
		} 
	}
	  
	render() {
		return (
			<div className="creation-card">
				<h2 className="subtitle">Создать карточку</h2>
				<form className="form">
					<fieldset className="fieldset">
    					<label htmlFor="name" className="label">Название</label>
    					<input type="text" id="name" className="input"/>
    				</fieldset>
    				<fieldset className="fieldset">
    					<label htmlFor="sum" className="label">Сумма</label>
    					<input type="number" id="sum" className="input"/>
    				</fieldset>
    				<input type="button" className="button-add-card" value="Добавить карточку" onClick={this.addCart}/>
				</form>
			</div>
		)
	}
}

export default CreationCard;