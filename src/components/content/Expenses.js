import React from 'react';
import CreationCard from './../card/CreationCard.js';
import {connect} from 'react-redux';
import setSumAction from '../../actions/actionSum.js';
import Cards from '../card/Cards.js';

class Expenses extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Расходы</h1>
				<CreationCard type="expenses" sum={this.props.sum} setSum={this.props.setSumFunction}/>
				<h2 className="subtitle">Ваши карточки расходов</h2>
				<Cards/>
			</div>
			)
	}
}
function mapStateToProps(state) {
	return {
		sum: state.userInfo.sum
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setSumFunction: sum => {
			dispatch(setSumAction(sum))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Expenses);