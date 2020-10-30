import React from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";


class Sidebar extends React.Component {
	render() {
		return (
			<aside className="sidebar">
				<nav className="menu">
					<ul className="menu-list">
						<li className="menu-item">
							<Link to="/income" className="menu-link">Доходы</Link>
						</li>
						<li className="menu-item">
							<Link to="/expenses" className="menu-link">Расходы</Link>
						</li>
					</ul>
				</nav>
			</aside>
		)
	}
}

export default Sidebar;