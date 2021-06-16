import React from 'react';
import styled from "styled-components";
import {formItemStyle} from "../style-components/formItemStyle";
import {formLabelStyle} from "../style-components/formLabelStyle";
import {formInputStyle} from "../style-components/formInputStyle";
import {buttonPasswordStyle} from "../style-components/buttonPasswordStyle";

const FormItem = styled(formItemStyle)`
    flex-basis: 100%;
    margin: 25px 0 0 0;
    padding: 25px 0 0 0;
`;

const FormLabel = styled(formLabelStyle)``;

const FormInput = styled(formInputStyle)``;

const BtnPassword = styled(buttonPasswordStyle)``;

class FieldFormWithoutValue extends React.Component {
    render() {
        return (
            <FormItem className="form__item">
                <FormLabel htmlFor={this.props.id} className={`form__label${this.props.required ? ' required' : ''}`}>{this.props.label}</FormLabel>
                <FormInput type={this.props.type} ref={this.props.innerRef} id={this.props.id} name={this.props.id} className="form__input" required={this.props.required ? "required" : ""}
                       aria-required={this.props.required ? "required" : ""} onChange={this.props.functionOnChange} aria-label={this.props.label}/>
                {this.props.flagPasswordField &&
                    <BtnPassword className="button-visible-password" onClick={this.props.showHidePassword}/>
                }
            </FormItem>
        )
    }
}

export default React.forwardRef((props, ref) => <FieldFormWithoutValue innerRef={ref} {...props}/>);