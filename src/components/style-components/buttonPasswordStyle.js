import styled from 'styled-components';
import visiblePassword from '../../images/visiblePassword.svg';
import hiddenPassword from '../../images/hiddenPassword.svg';

export const buttonPasswordStyle = styled.button`
    position: absolute;
    right: 0;
    bottom: 7px;
    height: 19px;
    width: 32px;
    background-color: #fff;
    border: none;
    background-image: url(${visiblePassword});
    background-size: 100% 100%;
    transition: 200ms;

    &.button-hidden-password {
        background-image: url(${hiddenPassword});
    }

    &:focus {
        background-color: #d1d1d1;
    }
`;