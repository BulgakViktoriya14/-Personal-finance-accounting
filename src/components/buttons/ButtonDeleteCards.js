import React from 'react';
import styled from 'styled-components';
import img from '../../images/delete.svg';

const BtnDeleteCards = styled.button`
        position: fixed;
        right: 0;
        bottom: 0;
        background-color: #000;
        background-image: url(${img});
        background-size: 70% 70%;
        height: 60px;
        width: 60px;
        border: none;
        background-repeat: no-repeat;
        background-position: center;
    
        &:focus,
        &:hover {
            background-color: #b90000;
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