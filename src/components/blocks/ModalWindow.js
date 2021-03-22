import React from 'react';
import FormChangePassword from "./FormChangePassword";
import close from "../../images/close.svg";
import FormChangeAvatar from "./FormChangeAvatar";

class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flagChangePassword: false
        }
    }

    closeModalWindow = (e) => {
        let modalWindow = document.querySelector(".modal-window.open");

        if(e.target.classList.contains("modal-window") || e.target.classList.contains("modal-window__close") || e.target.parentElement.classList.contains("modal-window__close")) {
            modalWindow.classList.remove("open");
            modalWindow.querySelector(".form").reset();
        }

        if(modalWindow.classList.contains("modal-window__change-password")) {
            this.setState({flagChangePassword: false});
        }
    }

    openSuccessResult = () => {
        this.setState({flagChangePassword: true});
    }

    closeModalWindowAfterChangePassword = () => {
        document.querySelector(".modal-window").classList.remove("open");
        this.setState({flagChangePassword: false});
    }

    render() {
        return (
            <div className={this.props.nameClass} onClick={this.closeModalWindow}>
                <div className="modal-window__block">
                    {this.props.page === "profile-password" &&
                        <div className="modal-window__content">
                            <button className="modal-window__close">
                                <img src={close} alt="icon close"/>
                            </button>
                            <h4 className="modal-window__title">Изменить пароль</h4>
                            <FormChangePassword functionCloseWindow={this.closeModalWindowAfterChangePassword}
                                                openSuccessResult={this.openSuccessResult} flagChangePassword={this.state.flagChangePassword}></FormChangePassword>
                        </div>
                    }
                    {this.props.page === "profile-avatar" &&
                        <div className="modal-window__content">
                            <button className="modal-window__close">
                                <img src={close} alt="icon close"/>
                            </button>
                            <h4 className="modal-window__title">Изменить аватар</h4>
                            <FormChangeAvatar idUser={this.props.idUser} ></FormChangeAvatar>
                        </div>
                    }
                    {this.props.page === "check-in" &&
                        <div className="modal-window__content success-result">
                            <p className="success-result__text">Вы зарегистрированы</p>
                            <button className="form__submit" name="submit"
                                    onClick={() => document.location.href = "/login"}>Вход в аккаунт</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ModalWindow;