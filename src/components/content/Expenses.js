import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import Cards from '../card/Cards.js';

class Expenses extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Расходы</h1>
				<CreationCard type="expenses"/>
				<h2 className="subtitle">Ваши карточки расходов</h2>
				<Cards cards={this.props.cardsExpenses}/>
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