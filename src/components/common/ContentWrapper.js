import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Income from './../content/Income.js';
import Expenses from './../content/Expenses.js';

import Sidebar from './Sidebar.js';

class ContentWrapper extends React.Component {
	render() {
		return (
			<section className="content">
				<Router>
					<Sidebar/>
					<Switch>
						<Route path="/income" component={Income}/>
						<Route path="/expenses" component={Expenses}/>
					</Switch>
				</Router>
			</section>
		)
	}
}

export default ContentWrapper;