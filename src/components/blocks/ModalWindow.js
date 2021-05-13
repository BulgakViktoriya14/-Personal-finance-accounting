import React from 'react';
import FormChangePassword from "./FormChangePassword";
import close from "../../images/close.svg";
import FormChangeAvatar from "./FormChangeAvatar";
import FormSetNewPassword from "./FormSetNewPassword";

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
            <div className={this.props.nameClass} onClick={this.closeModalWindow} ref={this.modalWindow}>
                <div className="modal-window__block">
                    {this.props.page === "page-login" &&
                    <div className="modal-window__content">
                        <button className="close">
                            <img src={close} alt="icon close"/>
                        </button>
                        <h4 className="modal-window__title">Change password</h4>
                        <FormSetNewPassword functionCloseWindow={this.closeModalWindowAfterChangePassword}/>
                    </div>
                    }
                    {this.props.page === "profile-password" &&
                        <div className="modal-window__content">
                            <button className="close">
                                <img src={close} alt="icon close"/>
                            </button>
                            <h4 className="modal-window__title">Change password</h4>
                            <FormChangePassword functionCloseWindow={this.closeModalWindowAfterChangePassword}
                                                openSuccessResult={this.openSuccessResult} flagChangePassword={this.state.flagChangePassword}/>
                        </div>
                    }
                    {this.props.page === "profile-avatar" &&
                        <div className="modal-window__content">
                            <button className="close">
                                <img src={close} alt="icon close"/>
                            </button>
                            <h4 className="modal-window__title">Change avatar</h4>
                            <FormChangeAvatar history={this.props.history} ref={this.inputFile} idUser={this.props.idUser}/>
                        </div>
                    }
                    {this.props.page === "check-in" &&
                        <div className="modal-window__content success-result">
                            <p className="success-result__text">You are registered</p>
                            <button className="form__submit" name="submit"
                                    onClick={() => this.props.history.push("/login")}>Login to your account</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ModalWindow;