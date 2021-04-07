import React from 'react';
import {connect} from 'react-redux';

class MoneyAccount extends React.Component {
	render() {
		return (
			<div className="money-account">
				<h3 className="money-account_title">On your account:</h3>
				<span className="money-account_sum"><span className="number">{this.props.sum}</span> BYN.</span>
			</div>
			)
	}
}

function mapStateToProps(state) {
	return {
		sum: state.userInfo.userSum
	}
}

export default connect(mapStateToProps, null)(MoneyAccount);