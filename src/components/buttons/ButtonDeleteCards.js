import React from 'react';
import styled from 'styled-components';
import img from '../../images/delete.svg';
import {variablesStyle} from '../style-components/variablesStyle';

const BtnDeleteCards = styled.button`
        position: fixed;
        right: 0;
        bottom: 0;
        background-color: ${variablesStyle.colors.colorBlack};
        background-image: url(${img});
        background-size: 70% 70%;
        height: 60px;
        width: 60px;
        border: none;
        background-repeat: no-repeat;
        background-position: center;
    
        &:focus,
        &:hover {
            background-color: ${variablesStyle.colors.colorRed};
        }
    
        @include breakpoint(mobile) {
            height: 40px;
            width: 40px;
        }
    `

class ButtonDeleteCard extends React.Component {
    render() {
        return (
            <BtnDeleteCards className="button-delete-card" onClick={this.props.changeFlagDeleteCard}/>
        )
    }
}

export default ButtonDeleteCard;