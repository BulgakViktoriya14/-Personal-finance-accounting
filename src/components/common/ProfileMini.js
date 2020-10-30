import React from 'react';
import photo from './../../img/profile.png';

class ProfileMini extends React.Component {
	render() {
		return (
			<div class="header__profile">
				<h3 class="header__name">Булгак Виктория</h3>
				<div class="header__photo wrapper-img">
					<img src={photo} alt="photo"/>
				</div>
			</div>
		)
	}
}
export default ProfileMini;