import React from 'react';
import {validateEmptyField} from "../../functions/validateEmptyField";
import {v4 as uuidv4} from "uuid";
import firebase from 'firebase';
import {setUserSumAction} from "../../actions/actionSumUser";
import {connect} from 'react-redux';

class FormCreateCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: ''
        }
    }

    getDate = () => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yy = now.getFullYear();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    createCard = () => {
        let sum = document.querySelector("#sum").value;
        let category = document.querySelector("#category").value;
        let name = document.querySelector("#name").value;
        let description = document.querySelector("#description").value;
        let date = this.getDate();
        return  {
            title: name,
            money: sum,
            category: category,
            date: date,
            description: description
        }
    }

    checkResultAccount = (value) => {
        if(this.props.type === "expenses" && Number(value) > Number(this.props.userSum)) {
            this.setState({errorText: "Your balance does not allow the operation"});
            return false;
        }
        return true;
    }

    addCart = () => {
        let arrayRequiredFields = document.querySelectorAll('input[required]');
        let arrayRequiredFieldsValues = [];
        arrayRequiredFields.forEach(function (elem) {
            arrayRequiredFieldsValues.push(elem.value);
        })

        if(!validateEmptyField(arrayRequiredFieldsValues)) {
            this.setState({errorText: "You did not fill in the required fields"});
            return;
        } else {
            this.setState({errorText: ''});
        }
        if(!this.checkResultAccount(document.querySelector("#sum").value)) return;

        let _this = this;
        let card = this.createCard();

        if(this.props.type === "income") {
            let newSum = Number(this.props.userSum) + Number(card.money);
            let id = uuidv4();
            let path = '/users/user' + _this.props.userId + '/cardsIncome/card' + id;
            firebase.database().ref(path).set({
                startedAt: firebase.database.ServerValue.TIMESTAMP,
                id: id,
                category: card.category,
                date: card.date,
                money: card.money,
                title: card.title,
                description: card.description
            })
                .then(() => {document.querySelector(".form").reset();})
                .then(() => {_this.props.setUserSumFunction(newSum)})
                .then(() => {
                    firebase.database().ref('/users/user' + _this.props.userId).update({
                        money: newSum
                    })
                })
        } else {
            let newSum = Number(this.props.userSum) - Number(card.money);
            let id = uuidv4();
            let path = '/users/user' + _this.props.userId + '/cardsExpenses/card' + id;
            firebase.database().ref(path).set({
                startedAt: firebase.database.ServerValue.TIMESTAMP,
                id: id,
                category: card.category,
                date: card.date,
                money: card.money,
                title: card.title,
                description: card.description
            })
                .then(() => {document.querySelector(".form").reset();})
                .then(() => {_this.props.setUserSumFunction(newSum)})
                .then(() => {
                    firebase.database().ref('/users/user' + _this.props.userId).update({
                        money: newSum
                    })
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <form className="form form-add-card">
                <div className="form__item">
                    <label htmlFor="name" className="form__label required">Title</label>
                    <input type="text" id="name" className="form__input" required="required"/>
                </div>
                <div className="form__item">
                    <label htmlFor="category" className="form__label">Category</label>
                    <input type="text" id="category" className="form__input"/>
                </div>
                <div className="form__item">
                    <label htmlFor="sum" className="form__label required">Amount</label>
                    <input type="number" id="sum" className="form__input" required="required"/>
                </div>
                <div className="form__item">
                    <label htmlFor="description" className="form__label">Description<span className="form__notice">(30 characters)</span></label>
                    <textarea maxLength="30" type="text" id="description" className="form__textarea"/>
                </div>
                <input type="button" className="button-add-card" value="Add card" onClick={this.addCart}/>
                {this.state.errorText &&
                    <p className="massage-error">{this.state.errorText}</p>
                }
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        cardsIncome: state.userInfo.cardsIncome,
        cardsExpenses: state.userInfo.cardsExpenses,
        userId: state.userInfo.idUser,
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

export default connect(mapStateToProps, matchDispatchToProps)(FormCreateCard);