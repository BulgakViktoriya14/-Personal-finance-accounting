import React from 'react';
import firebase from 'firebase';
import FieldFormWithoutValue from "../fields/FieldFormWithoutValue";

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
            <form className="form form-set-password">
                {!this.state.flagSendEmail &&
                    <FieldFormWithoutValue ref={this.email} label={"Your email"} id={"email-for-password"} type={"email"} required={true}/>
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