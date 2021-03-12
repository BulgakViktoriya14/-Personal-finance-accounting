import React from 'react';
import {NavLink} from 'react-router-dom';
import MoneyAccount from './MoneyAccount.js';


class Sidebar extends React.Component {
	render() {
		return (
			<aside className="sidebar">
				<nav className="menu">
					<ul className="menu-list">
						<li className="menu-item">
							<NavLink exact to="/income" className="menu-link" activeClassName="menu-link_active">Доходы</NavLink>
						</li>
						<li className="menu-item">
							<NavLink exact to="/expenses" className="menu-link" activeClassName="menu-link_active">Расходы</NavLink>
						</li>
					</ul>
				</nav>
				<MoneyAccount/>
			</aside>
		)
	}
}

export default Sidebar;