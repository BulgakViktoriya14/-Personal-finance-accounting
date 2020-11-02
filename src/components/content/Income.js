import React from 'react';
import CreationCard from './../card/CreationCard.js';

class Income extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<h1 className="title">Доходы</h1>
				<CreationCard/>
				<h2 className="subtitle">Ваши карточки доходов</h2>
			</div>
		)
	}
}
export default Income;