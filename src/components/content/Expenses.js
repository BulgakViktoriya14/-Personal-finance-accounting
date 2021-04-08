import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import Cards from '../card/Cards.js';
import ButtonOpenPopupAddCard from "../blocks/ButtonOpenPopupAddCard";
import ButtonDeleteCard from "../blocks/ButtonDeleteCards";

class Expenses extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flagDeleteCard: false
		}
	}

	changeFlagDeleteCard = () => {
		this.setState({flagDeleteCard: !this.state.flagDeleteCard});
	}

	render() {
		return (
			<div className="wrapper">
				<ButtonOpenPopupAddCard/>
				<h1 className="title">Expenses</h1>
				<CreationCard type="expenses"/>
				<h2 className="subtitle">Your expenses cards:</h2>
				<Cards flagDeleteCard={this.state.flagDeleteCard} cards={this.props.cardsExpenses} type={"cardsExpenses"}/>
				<ButtonDeleteCard changeFlagDeleteCard={this.changeFlagDeleteCard}></ButtonDeleteCard>
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