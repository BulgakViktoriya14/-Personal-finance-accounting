import React from 'react';
import Logo from './Logo.js';
import ProfileMini from './ProfileMini.js';

class Header extends React.Component {
	render() {
		return (
			<header className="header">
				<Logo/>
				<ProfileMini/>
			</header>
		)
	}
}
export default Header;