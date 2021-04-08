import React from 'react';

class ButtonDeleteCard extends React.Component {
    render() {
        return (
            <button className="button-delete-card" onClick={this.props.changeFlagDeleteCard}></button>
        )
    }
}

export default ButtonDeleteCard;