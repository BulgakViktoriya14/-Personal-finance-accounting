import styled from 'styled-components';
import {variablesStyle} from './variablesStyle';

export const messageErrorStyle = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 0 0;
    width: 100%;
    padding: 10px 20px;
    border: 2px solid ${variablesStyle.colors.colorRed};
    font-size: 14px;
    text-align: center;
    color: ${variablesStyle.colors.colorRed};
    font-weight: bold;
    line-height: 18px;
    position: relative;
    
    &:before {
        content: "!";
        position: absolute;
        left: 10px;
        font-size: 40px;
    }
`;