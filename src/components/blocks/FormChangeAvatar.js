import React from 'react';
import firebase from 'firebase';

class FormChangeAvatar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorText: ""
        }

        this.labelInputFile = React.createRef();
    }

    saveNewAvatar = (e) => {
        e.preventDefault();
        let file = this.props.inputFile.current.files[0];
        let _this = this;
        if(file) {
            firebase.storage().ref().child(`avatars/${_this.props.idUser}`).put(file)
                .then(function(result) {
                    _this.setState({errorText: ""});
                    _this.props.history.go(0);
                });
        } else {
            this.setState({errorText: "You haven't selected a file"});
        }
    }

    uploadFile = (e) => {
        if(e.target.value) {
            this.labelInputFile.current.classList.add("upload-file");
        }
    }

    render() {
        return (
            <form className="form form-change-avatar">
                <div className="form__wrapper-file">
                    <label htmlFor="money" className="form__label" ref={this.labelInputFile}>Select a file</label>
                    <input type="file" id="file" name="file" className="form__input" onChange={this.uploadFile} ref={this.props.inputFile}/>
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

export default React.forwardRef((props, ref) => <FormChangeAvatar inputFile={ref} {...props}/>);