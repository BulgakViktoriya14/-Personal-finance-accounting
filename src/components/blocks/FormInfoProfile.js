import React from 'react';

class FormInfoProfile extends React.Component {
    render() {
        return (
            <form className="form profile__info-form">
                <div className="form__item">
                    <label htmlFor="name-user" className="form__label">Name</label>
                    <input type="text" id="name-user" name="name-user" className="form__input"
                           readOnly={this.props.flag} value={this.props.userName} onChange={this.props.handleChange}/>
                </div>
                <div className="form__item">
                    <label htmlFor="email" className="form__label">E-mail</label>
                    <input type="email" id="email" name="email" className="form__input"
                           readOnly={this.props.flag} value={this.props.userEmail} onChange={this.props.handleChange}/>
                </div>
            </form>
        )
    }
}

export default FormInfoProfile