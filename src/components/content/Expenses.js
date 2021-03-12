import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import setSumAction from '../../actions/actionSum.js';
import setCardsExpensesAction from '../../actions/actionCardsExpenses.js';
import Cards from '../card/Cards.js';

class Expenses extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Расходы</h1>
				<CreationCard type="expenses" cards={this.props.cardsExpenses} sum={this.props.sum} setSum={this.props.setSumFunction} setCards={this.props.setCardsExpensesFunction}/>
				<h2 className="subtitle">Ваши карточки расходов</h2>
				<Cards cards={this.props.cardsExpenses}/>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		cardsExpenses: state.userInfo.cardsExpenses,
		sum: state.userInfo.sum
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setSumFunction: sum => {
			dispatch(setSumAction(sum))
		},
		setCardsExpensesFunction: cardsExpenses => {
			dispatch(setCardsExpensesAction(cardsExpenses))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Expenses);