import React from 'react';

class FieldFormWithValue extends React.Component {
    render() {
        return (
            <div className="form__item">
                <label htmlFor={this.props.id} className={`form__label${this.props.required ? ' required' : ''}`}>{this.props.label}</label>
                <input type={this.props.type} id={this.props.id} value={this.props.value ? this.props.value : ""} readOnly={this.props.readonly ? "readonly" : ""} name={this.props.id} className="form__input" required={this.props.required ? "required" : ""} onChange={this.props.functionOnChange}/>
                {this.props.flagPasswordField &&
                    <button className="button-visible-password" onClick={this.props.showHidePassword}/>
                }
            </div>
        )
    }
}

export default FieldFormWithValue;