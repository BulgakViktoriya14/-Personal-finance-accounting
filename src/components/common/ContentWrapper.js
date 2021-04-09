import React from 'react';
import {Switch, Route} from "react-router-dom";
import Income from './../content/Income';
import Expenses from './../content/Expenses';
import Login from './../content/Login';
import CheckIn from './../content/CheckIn';
import Sidebar from './Sidebar';
import Profile from './../content/Profile';
import {connect} from "react-redux";

class ContentWrapper extends React.Component {
	openSidebar = () => {
		document.querySelector(".sidebar").classList.add("sidebar_open");
	}

	render() {
		return (
			<section className="content">
				{this.props.userName &&
					<button className="button-open-sidebar" onClick={this.openSidebar}/>
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

export default connect(mapStateToProps, null)(ContentWrapper);