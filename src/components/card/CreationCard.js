import React from 'react';
import close from "../../images/close.svg";
import FormCreateCard from "../blocks/FormCreateCard";
import styled from "styled-components";
import {variablesStyle} from '../style-components/variablesStyle';

export const BlockCreationCardStyle = styled.div`
	@media screen and (max-width: 768px) {
		position: fixed;
        top: 60px;
        left: 0;
        left: 0;
        height: calc(100vh - 60px);
        background-color: ${variablesStyle.colors.colorWhite};
        z-index: -1;
        opacity: 0;
        transition: 200ms;
        padding: 30px;
        width: 100%;
        
         &.creation-card_open {
            z-index: 2;
            opacity: 1;
        }
	}
`;

export const ButtonCloseStyle = styled.button`
	display: none;
	
	@media screen and (max-width: 768px) {
		display: block;
	}
`;

export const SubtitleCreationCardStyle = styled.h2`
	@media screen and (max-width: 768px) {
		margin: 0;
	}
`;

class CreationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorText: ''
		}

		this.blockCreateCard = React.createRef();
	}

	closePopupCreationCard = () => {
		this.blockCreateCard.current.classList.remove("creation-card_open");
	}
	  
	render() {
		return (
			<BlockCreationCardStyle className="creation-card" ref={this.blockCreateCard}>
				<ButtonCloseStyle className="close" onClick={this.closePopupCreationCard}><img src={close} alt="close"/></ButtonCloseStyle>
				<SubtitleCreationCardStyle className="subtitle">Create card</SubtitleCreationCardStyle>
				<FormCreateCard type={this.props.type}/>
			</BlockCreationCardStyle>
		)
	}
}

export default CreationCard;