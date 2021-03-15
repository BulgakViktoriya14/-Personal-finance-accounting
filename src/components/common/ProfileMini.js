import React from 'react';
import photo from './../../images/profile.png';
import firebase from 'firebase';
import {connect} from 'react-redux';

class ProfileMini extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			flag: false
		}
	}

	componentDidMount() {
		const db = firebase.database();
		let _this = this;

		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				_this.setState({ flag: true, });
				let currentEmail = user.email;
			  	db.ref('/users').on('value', snap => {
				  let objectUsers = snap.val();
				  for(let key in objectUsers) {
				  	if(currentEmail === objectUsers[key].email) {
				  		let nameUser = objectUsers[key].name;
						_this.setState({ name: nameUser, });
				  	}
				  }
				})
			} else {
				_this.setState({ flag: false, });
		  	}
		});
	}

	render() {
		return (
			<div className={ this.state.flag ? 'header__profile' : 'header__profile_hidden' }>
				<h3 className="header__name">{this.state.name}</h3>
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