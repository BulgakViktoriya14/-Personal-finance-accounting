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

class FieldFormWithValue extends React.Component {
    render() {
        return (
            <FormItem className="form__item">
                <FormLabel htmlFor={this.props.id} className={`form__label${this.props.required ? ' required' : ''}`}>{this.props.label}</FormLabel>
                <FormInput type={this.props.type} id={this.props.id} value={this.props.value ? this.props.value : ""}
                       readOnly={this.props.readonly ? "readonly" : ""} name={this.props.id} className="form__input" aria-required={this.props.required ? "required" : ""}
                       required={this.props.required ? "required" : ""} ref={this.props.innerRef} onChange={this.props.functionOnChange} aria-label={this.props.label}/>
                {this.props.flagPasswordField &&
                    <BtnPassword className="button-visible-password" onClick={this.props.showHidePassword}/>
                }
            </FormItem>
        )
    }
}

export default React.forwardRef((props, ref) => <FieldFormWithValue innerRef={ref} {...props}/>);