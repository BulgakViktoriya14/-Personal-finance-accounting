import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import Sidebar from './Sidebar.js';

class ContentWrapper extends React.Component {
	render() {
		return (
			<section class="content">
				<Sidebar/>
				<Router>
				<Switch>
	        		<Route path="/about">
	            		<h2>About</h2>
	        		</Route>
	        		<Route path="/users">
	        			<h2>Users</h2>
	        		</Route>
	        		<Route path="/">
	        			<h2>Home</h2>
	        		</Route>
	        	</Switch>
	        	</Router>
			</section>
		)
	}
}

export default ContentWrapper;