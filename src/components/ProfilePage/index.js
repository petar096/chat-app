import React, { Component } from 'react';

import ProfileInfo from './ProfileInfo';
import ChangePasswordForm from './ChangePasswordForm';

import './_ProfilePage.scss';

class ProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: 1
		};
	}

	render() {
		return (
			<div className="profile-page-container">
				<nav className="profile-page-nav">
					<a
						className="profile-page-link"
						onClick={() => this.setState({ form: 1 })}>
						User info{' '}
					</a>
					<a
						className="profile-page-link"
						onClick={() => this.setState({ form: 2 })}>
						Security
					</a>
				</nav>
				<div className="profile-page-content">
					{this.state.form === 1 && <ProfileInfo />}
					{this.state.form === 2 && <ChangePasswordForm />}
				</div>
			</div>
		);
	}
}

export default ProfilePage;
