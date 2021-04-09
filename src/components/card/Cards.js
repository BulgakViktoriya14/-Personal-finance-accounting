import React from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setUserSumAction} from "../../actions/actionSumUser";

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayCards: []
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.cards !== prevProps.cards) {
            this.createList();
        }
    }

    componentDidMount() {
        this.createList();
    }

    sortCard(array) {
        array.sort((a, b) => a.startedAt > b.startedAt ? 1 : -1);
    }

    createList = () => {
        let arrayCards = [];
        for(let card in this.props.cards) {
            arrayCards.push(this.props.cards[card]);
            this.sortCard(arrayCards);
        }
        arrayCards.reverse();
        this.setState({arrayCards: arrayCards});
    }

    openMoreDetails = (e) => {
        e.target.parentElement.classList.add("open");
    }

    closeMoreDetails = (e) => {
        e.target.parentElement.parentElement.classList.remove("open");
    }

    deleteCard = (e) => {
        let _this = this;
        let id = e.target.parentElement.getAttribute("id");
        let account = e.target.parentElement.querySelector(".card__sum").textContent;
        let sum = Number(this.props.userSum);
        firebase.database().ref('users/user' + _this.props.userId + '/' + _this.props.type + '/card' + id).remove()
            .then(function () {
                if(_this.props.type === "cardsIncome") {
                    sum -= Number(account);
                }
                if(_this.props.type === "cardsExpenses") {
                    sum += Number(account);
                }
                _this.props.setUserSumFunction(sum);
            }).then(function () {
                firebase.database().ref('users/user' + _this.props.userId).update({
                    money: sum
                })
            })
            .catch(error => console.log(error.message));
    }

    render() {
		return (
            <div className="container cards">
                {!this.state.arrayCards.length &&
                    <p className="cards-container-empty">You haven't created any cards yet.</p>
                }
                {this.state.arrayCards.map((item) =>
                    <article className="card" id={item.id} key={item.id}>
                        <button className={`card__button-delete${this.props.flagDeleteCard ? " visible" : ""}`} onClick={this.deleteCard}/>
                        <h3 className="card__title">{item.title}</h3>
                        <h4 className="card__category">{item.category}</h4>
                        {item.description &&
                            <button className="card__more-details" onClick={this.openMoreDetails}>More details</button>
                        }
                        <p className="card__bottom">
                            <span className="card__sum">{item.money}</span>
                            <span className="card__date">{item.date}</span>
                        </p>
                        {item.description &&
                            <div className="card__description">
                                <p>{item.description}</p>
                                <button className="card__more-details" onClick={this.closeMoreDetails}>Hide</button>
                            </div>
                        }
                    </article>
                )}
            </div>
        )
	}
}

function mapStateToProps(state) {
    return {
        userId: state.userInfo.idUser,
        cardsIncome: state.userInfo.cardsIncome,
        cardsExpenses: state.userInfo.cardsExpenses,
        userSum: state.userInfo.userSum
    }
}

function matchDispatchToProps(dispatch) {
    return {
        setUserSumFunction: (sum) => {
            dispatch(setUserSumAction(sum))
        }
    }
}

export default connect(mapStateToProps, matchDispatchToProps)(Cards);