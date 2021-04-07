import React from 'react';

class ButtonOpenPopupAddCard extends React.Component {
    openPopupAddCard = () => {
        document.querySelector(".creation-card").classList.add("creation-card_open");
    }

    render() {
        return (
            <button className="button-open-popup-add-card" onClick={this.openPopupAddCard}></button>
        )
    }
}

export default ButtonOpenPopupAddCard;