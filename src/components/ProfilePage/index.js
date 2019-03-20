import React, { Component } from 'react';

import ProfileInfo from './ProfileInfo';
import ChangePasswordForm from './ChangePasswordForm';
import { withTranslation } from 'react-i18next';

import './_ProfilePage.scss';

class ProfilePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: 1
		};
	}

	render() {
		const { t, i18n } = this.props;

		return (
			<div className="profile-page-container">
				<nav className="profile-page-nav">
					<a
						className="profile-page-link"
						onClick={() => this.setState({ form: 1 })}>
						{t('userInfo')}
					</a>
					<a
						className="profile-page-link"
						onClick={() => this.setState({ form: 2 })}>
						{t('security')}
					</a>
				</nav>
				<div className="profile-page-content">
					{this.state.form === 1 && <ProfileInfo t={t} />}
					{this.state.form === 2 && <ChangePasswordForm t={t} />}
				</div>
			</div>
		);
	}
}

export default withTranslation()(ProfilePage);
