import styled from 'styled-components';
import {variablesStyle} from './variablesStyle';

export const formLabelStyle = styled.label`
     font-size: 16px;
     line-height: 16px;
     font-weight: 600;
     margin: 0 0 5px 5px;
     font-family: 'Montserrat-SemiBold', sans-serif;
     
      &.required {
        &:after {
            content: "*";
            color: ${variablesStyle.colors.colorRed};
            margin: 0 0 0 3px;
        }
     }

     @media and screen(max-width: 768px) {
          font-size: 14px;
          line-height: 14px;
     }
`;