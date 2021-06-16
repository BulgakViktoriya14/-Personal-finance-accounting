import styled from 'styled-components';

export const btnDefault = styled.button`
  background-color: #fff;
  color: #b90000;
  font-size: 16px;
  line-height: 16px;
  padding: 10px 15px;
  border: 2px solid #b90000;
  transition: 200ms;
  font-weight: bold;
  box-shadow: 4px 4px 7px rgba(0, 0, 0, 0.2%);

  &:hover,
  &:active,
  &:focus {
    background-color: #b90000;
    color: #fff;
  }

  @include breakpoint(mobile) {
    font-size: 14px;
    line-height: 14px;
  }
`