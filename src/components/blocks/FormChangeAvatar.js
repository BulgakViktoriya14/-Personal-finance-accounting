import React from 'react';
import firebase from 'firebase';

class FormChangeAvatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: ""
        }
    }

    saveNewAvatar = (e) => {
        e.preventDefault();
        let file = document.querySelector("input[type='file']").files[0];
        let _this = this;
        if(file) {
            firebase.storage().ref("/avatars").child(`${_this.props.idUser}`).put(file)
                .then(function(result) {
                    _this.setState({errorText: ""});
                    window.location.reload();
                });
        } else {
            this.setState({errorText: "You haven't selected a file"});
        }
    }

    uploadFile = (e) => {
        if(e.target.value) {
            e.target.parentElement.querySelector(".form__label").classList.add("upload-file");
        }
    }

    render() {
        return (
            <form className="form form-change-avatar">
                <div className="form__wrapper-file">
                    <label htmlFor="money" className="form__label">Select a file</label>
                    <input type="file" id="file" name="file" className="form__input" onChange={this.uploadFile}/>
                </div>
                <button className="form__submit" name="submit"
                        onClick={this.saveNewAvatar}>Save photo</button>
                {this.state.errorText &&
                    <p className="massage-error">{this.state.errorText}</p>
                }
            </form>
        )
    }
}

export default FormChangeAvatar;