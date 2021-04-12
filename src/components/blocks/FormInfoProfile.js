import React from 'react';
import FieldFormWithValue from "../fields/FieldFormWithValue";

class FormInfoProfile extends React.Component {
    render() {
        return (
            <form className="form profile__info-form">
                <FieldFormWithValue label={"Name"} type={"text"} id={"name-user"} readonly={this.props.flag} value={this.props.userName} functionOnChange={this.props.handleChange}/>
                <FieldFormWithValue label={"E-mail"} type={"email"} id={"email"} readonly={this.props.flag} value={this.props.userEmail} functionOnChange={this.props.handleChange}/>
            </form>
        )
    }
}

export default FormInfoProfile