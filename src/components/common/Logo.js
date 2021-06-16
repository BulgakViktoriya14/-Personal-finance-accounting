import React from 'react';
import logo from './../../images/logo.png';
import styled from "styled-components";

export const LogoStyle = styled.div`
	flex-basis: 250px;
	
	 @media screen and (max-width: 768px) {
	 	flex-basis: 140px;
	 }
`;

class Logo extends React.Component {
	render() {
		return (
			<LogoStyle className="logo wrapper-img">
				<img src={logo} alt="logo"/>
			</LogoStyle>
		)
	}
}

export default Logo;