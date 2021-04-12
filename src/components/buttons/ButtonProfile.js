import React from 'react';

class ButtonProfile extends React.Component {
    render() {
        return (
            <button type="button" onClick={this.props.functionOnCLick} className="button-edit-profile">{this.props.nameButton}</button>
        )
    }
}

export default ButtonProfile;