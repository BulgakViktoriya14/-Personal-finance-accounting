import React from 'react';
import styled from 'styled-components';
import {btnDefault} from '../style-components/buttonStyle';

const BtnEditProfile = styled(btnDefault)``;

class ButtonProfile extends React.Component {
    render() {
        return (
            <BtnEditProfile type="button" onClick={this.props.functionOnCLick} className="button-edit-profile">{this.props.nameButton}</BtnEditProfile>
        )
    }
}

export default ButtonProfile;