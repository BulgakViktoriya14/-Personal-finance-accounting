import styled from 'styled-components';
import {variablesStyle} from './variablesStyle';

export const btnDefault = styled.input`
  background-color: ${variablesStyle.colors.colorWhite};
  color: ${variablesStyle.colors.colorRed};
  font-size: 16px;
  line-height: 16px;
  padding: 10px 15px;
  border: 2px solid ${variablesStyle.colors.colorRed};
  transition: 200ms;
  font-weight: bold;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2%);
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    background-color: ${variablesStyle.colors.colorRed};
    color: ${variablesStyle.colors.colorWhite};
  }

  @include breakpoint(mobile) {
    font-size: 14px;
    line-height: 14px;
  }
`