import React from 'react';
import firebase from 'firebase';

class FormChangePassword extends React.Component {
    constructor(props) {
        super(props);
    }

    changePassword = () => {
        let newPassOne = document.querySelector("#new-password").value;
        let newPassTwo = document.querySelector("#repeat-password").value;
        if(newPassOne === "") return;

        if(newPassOne === newPassTwo) {
            firebase.auth().currentUser.updatePassword('newPassword')
                .then(() => console.log("ok"))
                .catch(error => console.log(error));
        }
    }

    render() {
        return (
            <form className="form form-change-password">
                <div className="form__item">
                    <label htmlFor="new-password" className="form__label">Введите новый пароль</label>
                    <input type="password" id="new-password" name="new-password" className="form__input"/>
                </div>
                <div className="form__item">
                    <label htmlFor="repeat-password" className="form__label">Введите ещё раз новый пароль</label>
                    <input type="password" id="repeat-password" name="repeat-password" className="form__input"/>
                </div>
                <input className="form__submit" type="button" name="submit" value="Сохранить" onClick={this.changePassword}/>
            </form>
        )
    }
}

export default FormChangePassword;