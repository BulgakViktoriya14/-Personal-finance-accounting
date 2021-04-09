import React from 'react';
import Logo from './Logo';
import ProfileMini from './ProfileMini';

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