import React from 'react';
import photo from './../../images/profile.png';
import {connect} from 'react-redux';

class ProfileMini extends React.Component {
	render() {
		return (
			<div className="header__profile">
				<h3 className="header__name">{this.props.user}</h3>
				<div className="header__photo wrapper-img">
					<img src={photo} alt="photo"/>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		user: state.userInfo.user
	}
}

export default connect(mapStateToProps)(ProfileMini);