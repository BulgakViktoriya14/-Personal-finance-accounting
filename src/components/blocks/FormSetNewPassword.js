import React from 'react';
import firebase from 'firebase';
import FieldFormWithoutValue from "../fields/FieldFormWithoutValue";
import styled from "styled-components";
import {btnDefault} from "../style-components/buttonStyle";
import {messageSuccessStyle} from "../style-components/messageSuccessStyle";

const MessageSuccessStyle = styled(messageSuccessStyle)``;

const BtnDefault = styled(btnDefault)`
	box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2);
`;

const FormSetNewPasswordStyle = styled.form`
    flex-direction: column;

    .form__item {
        margin: 0 0 30px 0;
    }

    .form__submit {
        max-width: fit-content;
        margin: 0 auto;
    }
`;

class FormSetNewPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flagSendEmail: false
        }

        this.email = React.createRef();
    }

    sendEmail = (e) => {
        e.preventDefault();
        let _this = this;
        let email = this.email.current.value;
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                _this.setState({flagSendEmail: !_this.state.flagSendEmail})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <FormSetNewPasswordStyle className="form form-set-password">
                {!this.state.flagSendEmail &&
                    <FieldFormWithoutValue ref={this.email} label={"Your email"} id={"email-for-password"} type={"email"} required={true}/>
                }
                {!this.state.flagSendEmail &&
                    <BtnDefault className="form__submit" name="submit"
                        onClick={this.sendEmail}>Send email</BtnDefault>
                }
                {this.state.flagSendEmail &&
                <MessageSuccessStyle className="success-result">
                    <p className="success-result__text">Check your email</p>
                    <BtnDefault className="form__submit" name="submit"
                            onClick={this.props.functionCloseWindow}>Close</BtnDefault>
                </MessageSuccessStyle>
                }
            </FormSetNewPasswordStyle>
        )
    }
}

export default FormSetNewPassword;