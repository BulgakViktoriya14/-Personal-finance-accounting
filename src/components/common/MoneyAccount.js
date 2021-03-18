import React from 'react';
import {connect} from 'react-redux';

class MoneyAccount extends React.Component {
	render() {
		return (
			<div className="money-account">
				<h3 className="money-account_title">На вашем счету:</h3>
				<span className="money-account_sum"><span className="number">{this.props.sum}</span> руб.</span>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		sum: state.userInfo.userSum
	}
}

export default connect(mapStateToProps)(MoneyAccount);