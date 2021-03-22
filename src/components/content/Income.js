import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import Cards from '../card/Cards.js';

class Income extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Доходы</h1>
				<CreationCard type="income"/>
				<h2 className="subtitle">Ваши карточки доходов</h2>
				<Cards cards={this.props.cardsIncome}/>
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