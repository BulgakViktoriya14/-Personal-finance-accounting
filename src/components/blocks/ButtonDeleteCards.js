import React from 'react';

class ButtonDeleteCard extends React.Component {
    deleteCard = () => {
        console.log("delete");
    }

    render() {
        return (
            <button className="button-delete-card" onClick={this.deleteCard}></button>
        )
    }
}

export default ButtonDeleteCard;