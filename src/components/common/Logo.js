import React from 'react';
import logo from './../../img/logo.png';

class Logo extends React.Component {
	render() {
		return (
			<div className="logo wrapper-img">
				<img src={logo} alt="logo"/>
			</div>
		)
	}
}
export default Logo;