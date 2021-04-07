import React from 'react';
import {Switch, Route} from "react-router-dom";
import Income from './../content/Income.js';
import Expenses from './../content/Expenses.js';
import Login from './../content/Login.js';
import CheckIn from './../content/CheckIn.js'
import Sidebar from './Sidebar.js';
import Profile from './../content/Profile.js';
import {connect} from "react-redux";

class ContentWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	openSidebar = () => {
		document.querySelector(".sidebar").classList.add("sidebar_open");
	}

	render() {
		return (
			<section className="content">
				{this.props.userName &&
					<button className="button-open-sidebar" onClick={this.openSidebar}></button>
				}
				{this.props.userName &&
					<Sidebar/>
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

export default connect(mapStateToProps)(ContentWrapper);