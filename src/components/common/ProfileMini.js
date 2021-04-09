import React from 'react';
import photo from './../../images/profile.png';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

class ProfileMini extends React.Component {
	constructor(props) {
		super(props);
	}

	closeSidebar = () => {
		if(document.querySelector(".sidebar").classList.contains("sidebar_open")) {
			document.querySelector(".sidebar").classList.remove("sidebar_open");
		}
	}

	render() {
		return (
			<div className={ this.props.userName ? 'header__profile' : 'header__profile_hidden' }>
				<h3 className="header__name" >
					<NavLink exact to="/profile" onClick={this.closeSidebar}>
						{this.props.userName}
					</NavLink>
				</h3>
				<div className="header__photo wrapper-img">
					<NavLink exact to="/profile" onClick={this.closeSidebar}>
						<img src={this.props.userAvatar ? this.props.userAvatar : photo} alt="photo"/>
					</NavLink>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userName: state.userInfo.userName,
		userAvatar: state.userInfo.userAvatar
	}
}

export default connect(mapStateToProps, null)(ProfileMini);