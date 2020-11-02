import React from 'react';

class CreationCard extends React.Component {
	addCart() {
    	console.log("add card")
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