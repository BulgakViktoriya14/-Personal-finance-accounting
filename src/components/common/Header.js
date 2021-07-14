import React from 'react';
import Logo from './Logo';
import ProfileMini from './ProfileMini';
import styled from "styled-components";
import {variablesStyle} from '../style-components/variablesStyle';

export const HeaderStyle = styled.header`
	display: flex;
	flex-basis: 100%;
	background-color: ${variablesStyle.colors.colorBlack};
	justify-content: space-between;
	padding: 10px 40px;
	height: 110px;
	
	@media screen and (max-width: 768px) {
		padding: 10px;
		height: 60px;
	}
`;

class Header extends React.Component {
	render() {
		return (
			<HeaderStyle className="header">
				<Logo/>
				<ProfileMini/>
			</HeaderStyle>
		)
	}
}

export default Header;