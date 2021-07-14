import React from 'react';
import firebase from 'firebase';
import {validateEmptyField} from "../../functions/validateEmptyField";
import FieldFormWithoutValue from "../fields/FieldFormWithoutValue";
import {doVisibleOrHiddenPassword} from  "../../functions/doVisibleOrHiddenPassword";
import styled from "styled-components";
import {btnDefault} from "../style-components/buttonStyle";
import {messageErrorStyle} from "../style-components/messageErrorStyle";
import {messageSuccessStyle} from "../style-components/messageSuccessStyle";

const MessageSuccessStyle = styled(messageSuccessStyle)``;

const FormChangePasswordStyle = styled.form`
    flex-direction: column;

    .form__item {
        margin: 0 0 30px 0;
    }

    .form__submit {
        max-width: fit-content;
        margin: 0 auto;
    }
`;

const MessageErrorStyle = styled(messageErrorStyle)``;

const BtnDefault = styled(btnDefault)`
	box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2);
`;

class FormChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: ''
        }

        this.newPassword = React.createRef();
        this.repeatPassword = React.createRef();
    }

    changePassword = (e) => {
        e.preventDefault();
        let newPassOne = this.newPassword.current.value;
        let newPassTwo = this.repeatPassword.current.value;
        let _this = this;

        if(!validateEmptyField([newPassOne, newPassTwo])) {
            this.setState({errorText: "Your fields are empty"});
            return;
        }

        if(newPassOne === newPassTwo) {
            this.setState({errorText: ""});
            firebase.auth().currentUser.updatePassword(newPassOne)
                .then(() => {_this.props.openSuccessResult()}).catch(error => {this.setState({errorText: error.message})});
        } else {
            this.setState({errorText: "Your passwords do not match"});
        }
    }

    doVisibleOrHiddenPassword = (e) => {
        e.preventDefault();
        doVisibleOrHiddenPassword(e.target);
    }

    render() {
        return (
            <FormChangePasswordStyle className="form form-change-password">
                {!this.props.flagChangePassword &&
                    <FieldFormWithoutValue ref={this.newPassword} required={true} label={"New password"} type={"password"} id={"new-password"} flagPasswordField={true} showHidePassword={this.doVisibleOrHiddenPassword}/>
                }
                {!this.props.flagChangePassword &&
                    <FieldFormWithoutValue ref={this.repeatPassword} required={true} label={"Re-enter the new password"} type={"password"} id={"repeat-password"} flagPasswordField={true} showHidePassword={this.doVisibleOrHiddenPassword}/>
                }
                {!this.props.flagChangePassword &&
                    <BtnDefault className="form__submit" name="submit"
                       onClick={this.changePassword}>Save</BtnDefault>
                }
                {this.props.flagChangePassword &&
                    <MessageSuccessStyle className="success-result">
                        <p className="success-result__text">Your password has been updated</p>
                        <BtnDefault className="form__submit" name="submit"
                                onClick={this.props.functionCloseWindow}>Close</BtnDefault>
                    </MessageSuccessStyle>
                }
                {this.state.errorText &&
                    <MessageErrorStyle className="massage-error">{this.state.errorText}</MessageErrorStyle>
                }
            </FormChangePasswordStyle>
        )
    }
}

export default FormChangePassword;