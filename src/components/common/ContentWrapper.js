import React from 'react';
import {Switch, Route} from "react-router-dom";
import Income from './../content/Income';
import Expenses from './../content/Expenses';
import Login from './../content/Login';
import CheckIn from './../content/CheckIn';
import Sidebar from './Sidebar';
import Profile from './../content/Profile';
import {connect} from "react-redux";
import styled from "styled-components";
import img from '../../images/burger.svg';
import {variablesStyle} from '../style-components/variablesStyle';

export const ButtonOpenSidebar = styled.button`
	display: none;
	position: fixed;
	left: 0;
	border: none;
	background-color: ${variablesStyle.colors.colorBlack};
	width: 40px;
	height: 30px;
	background-size: 50%;
	background-repeat: no-repeat;
	background-position: center;
	background-image: url(${img});
	top: 130px;

	@media screen and (max-width: 1100px) {
		display: block;
	}
	
	@media screen and (max-width: 768px) {
		top: 70px;
	}
`;

class ContentWrapper extends React.Component {
	constructor(props) {
		super(props);

		this.blockSidebar = React.createRef();
	}

	openSidebar = () => {
		this.blockSidebar.current.classList.add("sidebar_open");
	}

	render() {
		return (
			<section className="content">
				{this.props.userName &&
					<ButtonOpenSidebar className="button-open-sidebar" onClick={this.openSidebar}/>
				}
				{this.props.userName &&
					<Sidebar ref={this.blockSidebar}/>
				}
				<Switch>
					<Route path="/login" component={Login}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/income" component={Income}/>
					<Route path="/expenses" component={Expenses}/>
					<Route path="/" component={CheckIn}/>
				</Switch>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return {
		userName: state.userInfo.userName
	}
}

export default connect(mapStateToProps, null)(ContentWrapper);