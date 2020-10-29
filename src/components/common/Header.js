import React from 'react';
import Logo from './components/common/Logo.js';

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