import React from 'react';
import CreationCard from './../card/CreationCard';
import {connect} from 'react-redux';
import Cards from '../card/Cards';
import ButtonOpenPopupAddCard from "../buttons/ButtonOpenPopupAddCard";
import ButtonDeleteCard from "../buttons/ButtonDeleteCards";

class Income extends React.Component {
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
				<h1 className="title">Income</h1>
				<CreationCard type="income"/>
				<h2 className="subtitle">Your income cards:</h2>
				<Cards flagDeleteCard={this.state.flagDeleteCard} cards={this.props.cardsIncome} type={"cardsIncome"}/>
				<ButtonDeleteCard changeFlagDeleteCard={this.changeFlagDeleteCard}/>
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