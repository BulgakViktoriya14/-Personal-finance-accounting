import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import Cards from '../card/Cards.js';
import ButtonOpenPopupAddCard from "../blocks/ButtonOpenPopupAddCard";
import ButtonDeleteCard from "../blocks/ButtonDeleteCards";

class Expenses extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<ButtonOpenPopupAddCard/>
				<h1 className="title">Expenses</h1>
				<CreationCard type="expenses"/>
				<h2 className="subtitle">Your expenses cards:</h2>
				<Cards cards={this.props.cardsExpenses}/>
				<ButtonDeleteCard></ButtonDeleteCard>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		cardsExpenses: state.userInfo.cardsExpenses,
	}
}

export default connect(mapStateToProps, null)(Expenses);