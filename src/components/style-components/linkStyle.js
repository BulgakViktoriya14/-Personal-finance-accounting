import styled from 'styled-components';

export const linkStyle = styled.a`
        font-weight: bold;
        color: #b90000;

        &.button {
            background-color: #fff;
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
                background-color: #b90000;
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
            background-color: #b90000;
        }
`;