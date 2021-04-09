import React from 'react';
import close from "../../images/close.svg";
import FormCreateCard from "../blocks/FormCreateCard";

class CreationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			errorText: ''
		}
	}

	closePopupCreationCard = () => {
		document.querySelector(".creation-card").classList.remove("creation-card_open");
	}
	  
	render() {
		return (
			<div className="creation-card">
				<button className="close" onClick={this.closePopupCreationCard}><img src={close} alt="close"/></button>
				<h2 className="subtitle">Create card</h2>
				<FormCreateCard type={this.props.type}/>
			</div>
		)
	}
}

export default CreationCard;