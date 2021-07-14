import React from 'react';
import FormChangePassword from "./FormChangePassword";
import close from "../../images/close.svg";
import FormChangeAvatar from "./FormChangeAvatar";
import FormSetNewPassword from "./FormSetNewPassword";
import styled from "styled-components";
import {btnDefault} from "../style-components/buttonStyle";
import {messageSuccessStyle} from "../style-components/messageSuccessStyle";
import {variablesStyle} from '../style-components/variablesStyle';

const MessageSuccessStyle = styled(messageSuccessStyle)``;

const BtnDefault = styled(btnDefault)`
	box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2);
`;

const ModalWindowBlockStyle = styled.div`
    transition: 300ms;
    width: 500px;
    background-color: ${variablesStyle.colors.colorWhite};
    padding: 30px;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
    position: relative;
    cursor: default;
    
     @media screen and (max-width: 768px) {
        width: 100%;
        height: 100vh;
        box-shadow: none;
    }
`;


const ModalWindowTitleStyle = styled.h4`
    color: $colorRed;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
    margin: 0 0 30px 0;
`;


export const ModalWindowStyle = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms;
    transform: translateY(-100vh);
    cursor: pointer;
    
    &.open {
        transform: rotateY(0);
    }
`;


class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flagChangePassword: false,
        }

        this.modalWindow = React.createRef();
        this.inputFile = React.createRef();
    }

    closeModalWindow = (e) => {
        let modalWindow = this.modalWindow.current;

        if(e.target.classList.contains("modal-window") || e.target.classList.contains("close") || e.target.parentElement.classList.contains("close")) {
            if(modalWindow.classList.contains("modal-window__change-password")) {
                this.setState({flagChangePassword: false});
            }
            modalWindow.classList.remove("open");
            if(modalWindow.classList.contains("modal-window__success-check-in")) {
                this.props.history.push("/login")
                return;
            }

            if(modalWindow.classList.contains("modal-window__change-avatar")) {
                this.inputFile.current.classList.remove("upload-file");
            }

            modalWindow.querySelector(".form").reset();
        }
    }

    openSuccessResult = () => {
        this.setState({flagChangePassword: true});
    }

    closeModalWindowAfterChangePassword = () => {
        this.modalWindow.current.classList.remove("open");
        this.setState({flagChangePassword: false});
    }

    render() {
        return (
            <ModalWindowStyle className={this.props.nameClass} onClick={this.closeModalWindow} ref={this.modalWindow}>
                <ModalWindowBlockStyle className="modal-window__block">
                    {this.props.page === "page-login" &&
                    <div className="modal-window__content">
                        <button className="close">
                            <img src={close} alt="icon close"/>
                        </button>
                        <ModalWindowTitleStyle className="modal-window__title">Change password</ModalWindowTitleStyle>
                        <FormSetNewPassword functionCloseWindow={this.closeModalWindowAfterChangePassword}/>
                    </div>
                    }
                    {this.props.page === "profile-password" &&
                        <div className="modal-window__content">
                            <button className="close">
                                <img src={close} alt="icon close"/>
                            </button>
                            <ModalWindowTitleStyle className="modal-window__title">Change password</ModalWindowTitleStyle>
                            <FormChangePassword functionCloseWindow={this.closeModalWindowAfterChangePassword}
                                                openSuccessResult={this.openSuccessResult} flagChangePassword={this.state.flagChangePassword}/>
                        </div>
                    }
                    {this.props.page === "profile-avatar" &&
                        <div className="modal-window__content">
                            <button className="close">
                                <img src={close} alt="icon close"/>
                            </button>
                            <ModalWindowTitleStyle className="modal-window__title">Change avatar</ModalWindowTitleStyle>
                            <FormChangeAvatar history={this.props.history} ref={this.inputFile} idUser={this.props.idUser}/>
                        </div>
                    }
                    {this.props.page === "check-in" &&
                        <MessageSuccessStyle className="modal-window__content success-result">
                            <p className="success-result__text">You are registered</p>
                            <BtnDefault className="form__submit" name="submit"
                                    onClick={() => this.props.history.push("/login")}>Login to your account</BtnDefault>
                        </MessageSuccessStyle>
                    }
                </ModalWindowBlockStyle>
            </ModalWindowStyle>
        )
    }
}

export default ModalWindow;