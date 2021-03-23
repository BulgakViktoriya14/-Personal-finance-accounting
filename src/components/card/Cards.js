import React from 'react';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayCards: []
        }
    }
    createList = () => {
        let arrayCards = [];
        for(let card in this.props.cards) {
            arrayCards.push(this.props.cards[card]);
        }
        this.setState({arrayCards: arrayCards})
    }

    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
            this.createList();
        }
    }

    componentDidMount() {
        this.createList();
    }

    openMoreDetails = (e) => {
        e.target.parentElement.classList.add("open");
    }

    closeMoreDetails = (e) => {
        e.target.parentElement.parentElement.classList.remove("open");
    }

    render() {
		return (
            <div className="container cards">
                {this.state.arrayCards.reverse().map((item) =>
                    <article className="card">
                        <h3 className="card__title">{item.title}</h3>
                        <h4 className="card__category">{item.category}</h4>
                        {item.description &&
                            <button className="card__more-details" onClick={this.openMoreDetails}>Подробнее</button>
                        }
                        <p className="card__bottom">
                            <span className="card__sum">{item.money}</span>
                            <span className="card__date">{item.date}</span>
                        </p>
                        {item.description &&
                            <div className="card__description">
                                <p>{item.description}</p>
                                <button className="card__more-details" onClick={this.closeMoreDetails}>Скрыть</button>
                            </div>
                        }
                    </article>
                )}
            </div>
        )
	}
}


export default Cards;