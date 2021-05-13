import React from 'react';
import close from "../../images/close.svg";
import FormCreateCard from "../blocks/FormCreateCard";

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
			<div className="creation-card" ref={this.blockCreateCard}>
				<button className="close" onClick={this.closePopupCreationCard}><img src={close} alt="close"/></button>
				<h2 className="subtitle">Create card</h2>
				<FormCreateCard type={this.props.type}/>
			</div>
		)
	}
}

export default CreationCard;