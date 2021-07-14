import React from 'react';
import styled from 'styled-components';
import {btnDefault} from '../style-components/buttonStyle';


const BtnEditProfile = styled(btnDefault)`
    margin: 0 20px 0 0;

    @media screen and (max-width: 768px) {
        margin: 0 0 20px 0;
    }
`;

class ButtonProfile extends React.Component {
    render() {
        return (
            <BtnEditProfile type="button" onClick={this.props.functionOnCLick} className="button-edit-profile" value={this.props.nameButton}/>
        )
    }
}

export default ButtonProfile;