import React from 'react';
import firebase from 'firebase';
import styled from "styled-components";
import {formLabelStyle} from "../style-components/formLabelStyle";
import {formInputStyle} from "../style-components/formInputStyle";
import imgCheckMark from '../../images/check-mark.svg';
import imgFile from '../../images/file.svg';
import {btnDefault} from "../style-components/buttonStyle";
import {messageErrorStyle} from "../style-components/messageErrorStyle";

const MessageErrorStyle = styled(messageErrorStyle)``;

const FormChangeAvatarStyle = styled.form`
    flex-direction: column;

    .form__item {
        flex-basis: 100%;
    }
`;

const BtnDefault = styled(btnDefault)`
	box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2);
`;

const WrapperFileStyle = styled.div`
    padding: 10px;
    border: 2px solid black;
    height: 50px;
    margin: 0 0 30px 0;
    position: relative;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const FormLabel = styled(formLabelStyle)`
     margin: 0;
     padding: 0 0 0 25px;
     position: relative;

     &:before {
         content: "";
         position: absolute;
         background-image: url(${imgFile});
         width: 20px;
         height: 20px;
         display: block;
         left: 0;
         top: -3px;
         background-size: 100% 100%;
     }     
      
     &.upload-file {
         &:after {
            content: "";
            position: absolute;
            background-image: url(${imgCheckMark});
            width: 20px;
            height: 20px;
            display: block;
            right: -30px;
            top: -5px;
            background-size: 100% 100%;
         }
     }
`;

const FormInput = styled(formInputStyle)``;

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
            firebase.storage().ref("/avatars").child(`${_this.props.idUser}`).put(file)
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
            <FormChangeAvatarStyle className="form form-change-avatar">
                <WrapperFileStyle className="form__wrapper-file">
                    <FormLabel htmlFor="money" className="form__label" ref={this.labelInputFile}>Select a file</FormLabel>
                    <FormInput type="file" id="file" name="file" className="form__input" onChange={this.uploadFile} ref={this.props.inputFile}/>
                </WrapperFileStyle>
                <BtnDefault type="submit" className="form__submit" name="submit"
                        onClick={this.saveNewAvatar} value="Save photo"/>
                {this.state.errorText &&
                    <MessageErrorStyle className="massage-error">{this.state.errorText}</MessageErrorStyle>
                }
            </FormChangeAvatarStyle>
        )
    }
}

export default React.forwardRef((props, ref) => <FormChangeAvatar inputFile={ref} {...props}/>);