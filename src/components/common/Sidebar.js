import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";


class Sidebar extends React.Component {
	render() {
		return (
			<aside class="sidebar">
			 <Router>
				<nav>
		        	<ul>
		        	<li>
		        		<Link to="/">Home</Link>
		            </li>
		            <li>
		        		<Link to="/about">About</Link>
		        	</li>
		            <li>
		        		<Link to="/users">Users</Link>
		            </li>
		          </ul>
		        </nav>
		    </Router>
			</aside>
		)
	}
}

export default Sidebar;