import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import setSumAction from '../../actions/actionSum.js';
import setCardsIncomeAction from '../../actions/actionCardsIncome.js';
import Cards from '../card/Cards.js';

class Income extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Доходы</h1>
				<CreationCard  type="income" cards={this.props.cardsIncome} sum={this.props.sum} setSum={this.props.setSumFunction} setCards={this.props.setCardsIncomeFunction}/>
				<h2 className="subtitle">Ваши карточки доходов</h2>
				<Cards cards={this.props.cardsIncome}/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		cardsIncome: state.userInfo.cardsIncome,
		sum: state.userInfo.sum
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setSumFunction: sum => {
			dispatch(setSumAction(sum))
		},
		setCardsIncomeFunction: cardsIncome => {
			dispatch(setCardsIncomeAction(cardsIncome))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Income);