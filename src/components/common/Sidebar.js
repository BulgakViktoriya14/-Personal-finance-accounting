import React from 'react';
import {NavLink} from 'react-router-dom';
import MoneyAccount from './MoneyAccount';
import close from './../../images/close.svg';
import styled from "styled-components";
import {variablesStyle} from '../style-components/variablesStyle';

export const SidebarStyle = styled.aside`
	display: flex;
    flex-direction: column;
	flex-basis: 20%;
    border-right: 2px solid ${variablesStyle.colors.colorBlack};
	min-width: 320px;
	
	&.sidebar_open {
		z-index: 2;
		opacity: 1;
	}
	
	@media screen and (max-width: 1100px) {
		position: fixed;
		left: 0;	
		top: 110px;
		width: 100%;
		height: calc(100vh - 110px);
		background-color: ${variablesStyle.colors.colorWhite};
		transition: 200ms;
		opacity: 0;
		z-index: -1;
		border-right: none;
		min-width: 100%;
	}
	
	@media screen and (max-width: 768px) {
		height: calc(100vh - 60px);
		top: 60px;
	}
`;

export const MenuStyle = styled.ul`
 	padding: 0 60px 20px 60px;

	@media screen and (max-width: 768px) {
		padding: 20px 30px;
	}
`;

export const MenuItemStyle = styled.li`
	margin: 30px 0;

	@media screen and (max-width: 1100px) {
		margin: 20px 0;
	}
`;

export const MenuLinkStyle = styled(NavLink)`
	font-size: 34px;
	line-height: 38px;
	position: relative;
	padding: 0 0 3px 0;

	@media screen and (max-width: 768px) {
		font-size: 24px;
		line-height: 28px;
	}
	
	&.menu-link_active {
		color: ${variablesStyle.colors.colorRed};

	&:after {
		background-color: ${variablesStyle.colors.colorRed};
	}
`;

export const BtnCloseStyle = styled.button`
	display: none;
		
	@media screen and (max-width: 1100px) {
		display: block;
	}
`;

class Sidebar extends React.Component {
	closeSidebar = () => {
		this.props.blockSidebar.current.classList.remove("sidebar_open");
	}

	render() {
		return (
			<SidebarStyle className="sidebar" ref={this.props.blockSidebar}>
				<nav className="menu">
					<MenuStyle className="menu-list">
						<BtnCloseStyle className="close" onClick={this.closeSidebar}><img src={close} alt="close"/></BtnCloseStyle>
						<MenuItemStyle className="menu-item">
							<MenuLinkStyle exact to="/income" className="menu-link" activeClassName="menu-link_active" onClick={this.closeSidebar}>Income</MenuLinkStyle>
						</MenuItemStyle>
						<MenuItemStyle className="menu-item">
							<MenuLinkStyle exact to="/expenses" className="menu-link" activeClassName="menu-link_active" onClick={this.closeSidebar}>Expenses</MenuLinkStyle>
						</MenuItemStyle>
					</MenuStyle>
				</nav>
				<MoneyAccount/>
			</SidebarStyle>
		)
	}
}

export default React.forwardRef((props, ref) => <Sidebar blockSidebar={ref} {...props}/>);