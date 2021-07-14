import React from 'react';
import styled from 'styled-components';
import img from '../../images/plus.svg';
import {variablesStyle} from '../style-components/variablesStyle';

const BtnOpenPopupAddCard = styled.button`
  display: none;
  position: fixed;
  left: 0;
  border: none;
  background-color: ${variablesStyle.colors.colorBlack};
  width: 40px;
  height: 30px;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${img});
  top: 110px;
  
  @media screen and (max-width: 768px) {
      display: block;
  }
`;

class ButtonOpenPopupAddCard extends React.Component {
    openPopupAddCard = () => {
        document.querySelector(".creation-card").classList.add("creation-card_open");
    }

    render() {
        return (
            <BtnOpenPopupAddCard className="button-open-popup-add-card" onClick={this.openPopupAddCard}/>
        )
    }
}

export default ButtonOpenPopupAddCard;