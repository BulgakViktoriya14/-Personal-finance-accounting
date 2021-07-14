import styled from 'styled-components';
import {variablesStyle} from './variablesStyle';

export const linkStyle = styled.a`
        font-weight: bold;
        color: ${variablesStyle.colors.colorRed};

        &.button {
            background-color: ${variablesStyle.colors.colorWhite};
            border: none;
            padding: 0;
            margin: 10px 0 0 0;
            position: relative;

            &:after {
                content: "";
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 0;
                height: 1.5px;
                background-color: ${variablesStyle.colors.colorRed};
                transition: 300ms;
            }

            &:hover:after,
            &:focus:after {
                width: 100%;
            }

            @include breakpoint(mobile) {
                &:after {
                    display: none;
                }
            }
        }

        &:after {
            background-color: ${variablesStyle.colors.colorRed};
        }
`;