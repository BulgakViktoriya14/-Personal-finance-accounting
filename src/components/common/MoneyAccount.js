import React from 'react';

class MoneyAccount extends React.Component {
	render() {
		return (
			<div className="money-account">
				<h3 className="money-account_title">На вашем счету:</h3>
				<span className="money-account_sum"><span className="number">0</span> руб.</span>
			</div>
			)
	}
}
export default MoneyAccount;