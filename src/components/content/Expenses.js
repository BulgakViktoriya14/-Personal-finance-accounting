import React from 'react';
import CreationCard from './../card/CreationCard.js';

class Expenses extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Расходы</h1>
				<CreationCard/>
			</div>
			)
	}
}
export default Expenses;