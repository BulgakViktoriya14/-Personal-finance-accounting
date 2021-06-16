import React from 'react';
import FieldFormWithValue from "../fields/FieldFormWithValue";
import styled from "styled-components";

export const FormInfoUserStyle = styled.form`
    flex-basis: 45%;
    flex-direction: column;
    
    @media screen and (max-width: 768px) {
        flex-basis: 100%;
        width: 100%;
    }
`;

class FormInfoProfile extends React.Component {
    render() {
        return (
            <FormInfoUserStyle className="form profile__info-form">
                <FieldFormWithValue label={"Name"} type={"text"} id={"name-user"} readonly={this.props.flag} value={this.props.userName} functionOnChange={this.props.handleChange}/>
                <FieldFormWithValue label={"E-mail"} type={"email"} id={"email"} readonly={this.props.flag} value={this.props.userEmail} functionOnChange={this.props.handleChange}/>
            </FormInfoUserStyle>
        )
    }
}

export default FormInfoProfile