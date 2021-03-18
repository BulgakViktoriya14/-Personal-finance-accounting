import React from 'react';
import {Switch, Route} from "react-router-dom";
import Income from './../content/Income.js';
import Expenses from './../content/Expenses.js';
import Login from './../content/Login.js';
import CheckIn from './../content/CheckIn.js'
import Sidebar from './Sidebar.js';
import Profile from './../content/Profile.js';

class ContentWrapper extends React.Component {
	render() {
		return (
			<section className="content">
				<Sidebar/>
				<Switch>
					<Route path="/check-in" component={CheckIn}/>
					<Route path="/login" component={Login}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/income" component={Income}/>
					<Route path="/expenses" component={Expenses}/>
				</Switch>
			</section>
		)
	}
}

export default ContentWrapper;