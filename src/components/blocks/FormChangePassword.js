import React from 'react';
import firebase from 'firebase';

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
        if(newPassOne === "") return;

        if(newPassOne === newPassTwo) {
            this.setState({errorText: ""});
            firebase.auth().currentUser.updatePassword(newPassOne)
                .then(() => {_this.props.openSuccessResult()}).catch(error => {this.setState({errorText: error.message})});
        } else {
            this.setState({errorText: "Your passwords do not match!"});
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
                    <div className="form__item">
                        <label htmlFor="new-password" className="form__label">Enter a new password</label>
                        <input type="password" id="new-password" name="new-password" className="form__input"/>
                        <button className="button-visible-password" onClick={this.doVisibleOrHiddenPassword}></button>
                    </div>
                }
                {!this.props.flagChangePassword &&
                    <div className="form__item">
                        <label htmlFor="repeat-password" className="form__label">Re-enter the new password</label>
                        <input type="password" id="repeat-password" name="repeat-password" className="form__input"/>
                        <button className="button-visible-password" onClick={this.doVisibleOrHiddenPassword}></button>
                    </div>
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