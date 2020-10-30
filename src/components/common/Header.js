import React from 'react';
import Logo from './Logo.js';

class Header extends React.Component {
	render() {
		return (
			<header class="header">
				<Logo/>
			</header>
		)
	}
}
export default Header;