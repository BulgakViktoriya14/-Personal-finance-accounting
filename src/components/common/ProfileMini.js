import React from 'react';
import photo from './../../img/profile.png';

class ProfileMini extends React.Component {
	render() {
		return (
			<div className="header__profile">
				<h3 className="header__name">Булгак Виктория</h3>
				<div className="header__photo wrapper-img">
					<img src={photo} alt="photo"/>
				</div>
			</div>
		)
	}
}
export default ProfileMini;