import React from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setUserSumAction} from "../../actions/actionSumUser";
import styled from "styled-components";
import img from '../../images/delete.svg';
import {variablesStyle} from '../style-components/variablesStyle';

export const ContainerCardsStyle = styled.div`
    width: 102%;
    margin: 0 0 0 -1%;

    @media screen and (max-width: 768px) {
        width: 104%;
        margin: 0 0 0 -2%;
    }
`;

export const EmptyContainerCardsStyle = styled.p`
    margin: 20px 10px;
    font-size: 20px;
    line-height: 24px;
    color: ${variablesStyle.colors.colorGrey};

    @media screen and (max-width: 768px) {
       font-size: 16px;
       line-height: 20px;
    }
`;

export const CardTitleStyle = styled.h3`
    font-size: 18px;
    line-height: 22px;
    margin: 0 0 10px 0;
    
    @media screen and (max-width: 768px) {
        font-size: 14px;
        line-height: 18px;
    }
`;

export const CardCategoryStyle = styled.h4`
    font-size: 16px;
    line-height: 20px;
    font-weight: 300;
    margin: 10px 0 20px 0;
    font-family: 'Montserrat', sans-serif;
    
     @media screen and (max-width: 768px) {
        font-size: 12px;
     }
`;

export const CardBottomStyle = styled.p`
    margin: auto 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    
     .card__sum {
        font-size: 18px;
        line-height: 18px;
        font-weight: bold;
        color: ${variablesStyle.colors.colorRed};
     }
    
    .card__date {
        font-size: 14px;
        line-height: 14px;
        color: ${variablesStyle.colors.colorGrey};
    }
    
    @media screen and (max-width: 768px) {
        .card__sum {
            font-size: 14px;
            line-height: 14px;
        }
        
        .card__date {
            font-size: 12px;
            line-height: 12px;
        }
    }
`;

export const CardMoreDetailsStyle = styled.button`
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0 0 20px 0;
    font-size: 12px;
    line-height: 12px;
    text-align: left;
    cursor: pointer;
    transition: 200ms ease-in;
    
    @media screen and (max-width: 768px) {
        font-size: 10px;
        line-height: 10px;
    }
`;

export const CardDescriptionStyle = styled.div`
     display: flex;
     flex-direction: column;
     align-items: baseline;
     position: absolute;
     background-color: ${variablesStyle.colors.colorRed};
     top: 0;
     left: 0;
     margin: 0;
     height: 100%;
     width: 100%;
     color: ${variablesStyle.colors.colorWhite};
     padding: 20px;
     font-size: 14px;
     line-height: 20px;
     font-weight: bold;
     z-index: -1;
     opacity: 0;
     transition: 200ms ease-in;
     
      p {
        margin: 0;
      }
      
      ${CardMoreDetailsStyle} {
        margin: auto 0 0 0;
        color: ${variablesStyle.colors.colorWhite};
      }
`;

export const ButtonDeleteCardStyle = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background-color: ${variablesStyle.colors.colorRed};
    border: none;
    background-image: url(${img});
    background-size: 67%;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: -1;
    transition: 100ms;
    
    &.visible {
        opacity: 1;
        z-index: 1;

        &:hover,
        &:focus {
            opacity: 0.75;
        }
    }
`;

export const CardStyle = styled.article`
    display: flex;
    flex-direction: column;
    flex-basis: 23%;
    box-shadow: 2px 2px 6px #b7b7b7;
    padding: 20px;    
    margin: 15px 1%;
    position: relative;
    
     @media screen and (max-width: 768px) {
        flex-basis: 46%;
        margin: 7px 2%;
        padding: 10px;
     }
     
     &.open {
        ${CardDescriptionStyle} {
            z-index: 2;
            opacity: 1;
        }
     }
`;

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
            <ContainerCardsStyle className="container cards">
                {!this.state.arrayCards.length &&
                    <EmptyContainerCardsStyle className="cards-container-empty">You haven't created any cards yet.</EmptyContainerCardsStyle>
                }
                {this.state.arrayCards.map((item) =>
                    <CardStyle className="card" id={item.id} key={item.id}>
                        <ButtonDeleteCardStyle className={`card__button-delete${this.props.flagDeleteCard ? " visible" : ""}`} onClick={this.deleteCard}/>
                        <CardTitleStyle className="card__title">{item.title}</CardTitleStyle>
                        <CardCategoryStyle className="card__category">{item.category}</CardCategoryStyle>
                        {item.description &&
                            <CardMoreDetailsStyle className="card__more-details" onClick={this.openMoreDetails}>More details</CardMoreDetailsStyle>
                        }
                        <CardBottomStyle className="card__bottom">
                            <span className="card__sum">{item.money}</span>
                            <span className="card__date">{item.date}</span>
                        </CardBottomStyle>
                        {item.description &&
                            <CardDescriptionStyle className="card__description">
                                <p>{item.description}</p>
                                <CardMoreDetailsStyle className="card__more-details" onClick={this.closeMoreDetails}>Hide</CardMoreDetailsStyle>
                            </CardDescriptionStyle>
                        }
                    </CardStyle>
                )}
            </ContainerCardsStyle>
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