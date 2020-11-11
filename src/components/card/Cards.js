import React from 'react';

class Cards extends React.Component {
    constructor(props) {
        super(props);
    } 
	render() {
		return (
            <div className="container cards">
                {this.props.cards.map((item) =>
                    <article key={item.id} className="card">
                        <h3 className="cart__title">{item.name}</h3>
                        <h4 className="card__category">{item.category}</h4>
                        <p className="card__bottom">
                            <span className="card__sum">{item.sum}</span>
                            <span className="card__date">{item.date}</span>
                        </p>
                    </article>
                )}    
            </div>
        )
	}
}


export default Cards;