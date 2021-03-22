import React from 'react';
import firebase from 'firebase';

class FormChangeAvatar extends React.Component {
    constructor(props) {
        super(props);
    }

    saveNewAvatar = (e) => {
        e.preventDefault();
        let file = document.querySelector("input[type='file']").files[0];
        let _this = this;
        if(file) {
            firebase.storage().ref("/avatars").child(_this.props.idUser.toString()).put(file);
            // document.querySelector(".modal-window.open .modal-window__close").click();
            document.querySelector(".form-change-avatar").reset();
        }
    }

    render() {
        return (
            <form className="form form-change-avatar">
                <div className="form__item">
                    <label htmlFor="money" className="form__label">Выберите файл</label>
                    <input type="file" id="file" name="file" className="form__input"/>
                </div>
                <button className="form__submit" name="submit"
                        onClick={this.saveNewAvatar}>Сохранить фото</button>
            </form>
        )
    }
}

export default FormChangeAvatar;