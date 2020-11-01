import React from 'react';
import {Link} from 'react-router-dom';
import MoneyAccount from './MoneyAccount.js';


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
				<MoneyAccount/>
			</aside>
		)
	}
}

export default Sidebar;