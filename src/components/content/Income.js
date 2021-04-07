import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import Cards from '../card/Cards.js';
import ButtonOpenPopupAddCard from "../blocks/ButtonOpenPopupAddCard";
import ButtonDeleteCard from "../blocks/ButtonDeleteCards";

class Income extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<ButtonOpenPopupAddCard/>
				<h1 className="title">Income</h1>
				<CreationCard type="income"/>
				<h2 className="subtitle">Your income cards:</h2>
				<Cards cards={this.props.cardsIncome}/>
				<ButtonDeleteCard></ButtonDeleteCard>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		cardsIncome: state.userInfo.cardsIncome,
	}
}

export default connect(mapStateToProps, null)(Income);