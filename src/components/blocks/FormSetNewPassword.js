import React from 'react';

class FormSetNewPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    sendEmail = () => {
// forgotPassword = (Email) => {
        // 	firebase.auth().sendPasswordResetEmail(Email)
        // 		.then(function (user) {
        // 			alert('Please check your email...')
        // 		}).catch(function (e) {
        // 		console.log(e)
        // 	})
        // }
    }

    render() {
        return (
            <form className="form form-set-password">
                <div className="form__item">
                    <label htmlFor="email" className="form__label">Select a file</label>
                    <input type="email" id="email-for-password" name="email" className="form__input"/>
                </div>
                <button className="form__submit" name="submit"
                        onClick={this.sendEmail}>Send email</button>
            </form>
        )
    }
}

export default FormSetNewPassword;