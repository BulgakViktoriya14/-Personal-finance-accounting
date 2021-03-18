import React from 'react';
import FormChangePassword from "./FormChangePassword";
import close from "../../images/close.svg";

class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
    }

    closeModalWindow = (e) => {
        if(e.target.classList.contains("modal-window") || e.target.classList.contains("modal-window__close") || e.target.parentElement.classList.contains("modal-window__close")) {
            document.querySelector(".modal-window").classList.remove("open");
        }
    }

    render() {
        return (
            <div className="modal-window" onClick={this.closeModalWindow}>
                <div className="modal-window__block">
                    <button className="modal-window__close">
                        <img src={close} alt="icon close"/>
                    </button>
                    <h4 className="modal-window__title">{this.props.title}</h4>
                    <FormChangePassword></FormChangePassword>
                </div>
            </div>
        )
    }
}

export default ModalWindow;