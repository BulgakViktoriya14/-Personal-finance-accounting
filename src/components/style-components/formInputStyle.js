import styled from 'styled-components';
import {variablesStyle} from './variablesStyle';

export const formInputStyle = styled.input`
     padding: 5px;
     font-size: 14px;
     line-height: 14px;
     border-bottom: 1px solid ${variablesStyle.colors.colorBlack};

     &[readonly] {
        cursor: default;
        border-bottom: 1px solid ${variablesStyle.colors.colorWhite};
        
        &:focus {
            border-bottom: 1px solid ${variablesStyle.colors.colorWhite};
         }
     }

     &:focus {
        border-bottom: 1px solid ${variablesStyle.colors.colorRed};
     }

     &[type="file"] {
        border: none;
        margin: 0;
        padding: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
     }

     &:-webkit-autofill,
     &:-webkit-autofill:hover,
     &:-webkit-autofill:focus,
     &:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 15px $colorWhite inset !important;
     }

    @media and screen(max-width: 768px) {
        padding: 2px 5px;
    }
`;