import React from 'react';
import photo from './../../images/profile.png';
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';
import styled from "styled-components";
import {variablesStyle} from '../style-components/variablesStyle';

export const ProfileMiniStyle = styled.div`
	${props => {
		if (props.profileFlag) {
			return `
				display: flex;
			`
		} else {
			return `
				display: none;
			`
		}
	}}
	
	align-items: center;

	&_hidden {
		display: none;
	}

	&:hover {
		.header__name a:after {
			width: 100%;
		}
	}	
`;

export const PhotoStyle = styled.div`
	width: 70px;
	height: 70px;
	border-radius: 50%;	
	margin: 0 0 0 15px;
	
	@media screen and (max-width: 768px) {
		width: 40px;
		height: 40px;
		margin: 0 0 0 10px;
	}
`;

export const ImgPhotoStyle = styled.img`
	border-radius: 50%;
	object-fit: cover;
`;

export const ImgLinkStyle = styled(NavLink)`
	display: block;
	width: 100%;
	height: 100%;
`;

export const NameStyle = styled(NavLink)`
	color: ${variablesStyle.colors.colorWhite};
	font-size: 18px;
	line-height: 20px;
	
	&:after {
		background-color: ${variablesStyle.colors.colorWhite};
	}
	
	@media screen and (max-width: 768px) {
		font-size: 12px;
		line-height: 12px;
	}
`;

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
			<ProfileMiniStyle className={ this.props.userName ? 'header__profile' : 'header__profile_hidden' } profileFlag={this.props.userName}>
				<h3 className="header__name">
					<NameStyle exact to="/profile" onClick={this.closeSidebar}>
						{this.props.userName}
					</NameStyle>
				</h3>
				<PhotoStyle className="header__photo wrapper-img">
					<ImgLinkStyle exact to="/profile" onClick={this.closeSidebar}>
						<ImgPhotoStyle src={this.props.userAvatar ? this.props.userAvatar : photo} alt="photo"/>
					</ImgLinkStyle>
				</PhotoStyle>
			</ProfileMiniStyle>
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