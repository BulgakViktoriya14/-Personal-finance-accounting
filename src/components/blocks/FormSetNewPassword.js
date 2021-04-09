import React from 'react';
import firebase from 'firebase';

class FormSetNewPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            flagSendEmail: false
        }
    }

    sendEmail = (e) => {
        e.preventDefault();
        let _this = this;
        let email = document.querySelector("#email-for-password").value;
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                _this.setState({flagSendEmail: !_this.state.flagSendEmail})
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <form className="form form-set-password">
                {!this.state.flagSendEmail &&
                    <div className="form__item">
                        <label htmlFor="email" className="form__label required">Your email</label>
                        <input type="email" id="email-for-password" name="email" className="form__input" required="required"/>
                    </div>
                }
                {!this.state.flagSendEmail &&
                    <button className="form__submit" name="submit"
                        onClick={this.sendEmail}>Send email</button>
                }
                {this.state.flagSendEmail &&
                <div className="success-result">
                    <p className="success-result__text">Check your email</p>
                    <button className="form__submit" name="submit"
                            onClick={this.props.functionCloseWindow}>Close</button>
                </div>
                }
            </form>
        )
    }
}

export default FormSetNewPassword;