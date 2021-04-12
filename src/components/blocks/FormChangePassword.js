import React from 'react';
import firebase from 'firebase';
import {validateEmptyField} from "../../functions/validateEmptyField";
import FieldFormWithoutValue from "../fields/FieldFormWithoutValue";

class FormChangePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: ''
        }
    }

    changePassword = (e) => {
        e.preventDefault();
        let newPassOne = document.querySelector("#new-password").value;
        let newPassTwo = document.querySelector("#repeat-password").value;
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
        if(e.target.classList.contains("button-hidden-password")) {
            e.target.classList.remove("button-hidden-password");
            e.target.previousElementSibling.setAttribute("type", "password");
        } else {
            e.target.classList.add("button-hidden-password");
            e.target.previousElementSibling.setAttribute("type", "text");
        }
    }

    render() {
        return (
            <form className="form form-change-password">
                {!this.props.flagChangePassword &&
                    <FieldFormWithoutValue required={true} label={"New password"} type={"password"} id={"new-password"} flagPasswordField={true} showHidePassword={this.doVisibleOrHiddenPassword}/>
                }
                {!this.props.flagChangePassword &&
                    <FieldFormWithoutValue required={true} label={"Re-enter the new password"} type={"password"} id={"repeat-password"} flagPasswordField={true} showHidePassword={this.doVisibleOrHiddenPassword}/>
                }
                {!this.props.flagChangePassword &&
                    <button className="form__submit" name="submit"
                       onClick={this.changePassword}>Save</button>
                }
                {this.props.flagChangePassword &&
                    <div className="success-result">
                        <p className="success-result__text">Your password has been updated</p>
                        <button className="form__submit" name="submit"
                                onClick={this.props.functionCloseWindow}>Close</button>
                    </div>
                }
                {this.state.errorText &&
                    <p className="massage-error">{this.state.errorText}</p>
                }
            </form>
        )
    }
}

export default FormChangePassword;