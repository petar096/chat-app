import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '@actions/authActions';
import Avatar from '@common/Avatar';
import Capitalize from '@helpers/Capitalize';
import { useTranslation } from 'react-i18next';

import serbia from '@images/serbia.svg';
import uk from '@images/uk.svg';

import './_RightSidenav.scss';

const RightSidenav = props => {
	const { t, i18n } = useTranslation();

	const changeLanguage = lng => {
		i18n.changeLanguage(lng);
	};

	return (
		<aside
			className={`right-side-nav ${
				props.opened ? 'right-side-nav--opened' : ''
			}`}>
			{props.auth.firstName === '' ? (
				<p>Loading...</p>
			) : (
				<React.Fragment>
					<Avatar
						src={props.auth.avatar}
						alt="User avatar image"
						size="sm"
						style={{ marginTop: '3rem', marginBottom: '2rem' }}
					/>
					<span style={{ fontSize: '1.8rem', color: '#fff' }}>
						{Capitalize(props.auth.firstName)} {Capitalize(props.auth.lastName)}
					</span>
					<nav style={{ marginTop: '3rem' }}>
						<NavLink to="/profile" className="right-side-nav__link">
							{t('myProfile')}
						</NavLink>
						<a onClick={props.logout} className="right-side-nav__link">
							{t('logout')}
						</a>
						<div style={{ display: 'flex' }}>
							<a
								onClick={() => changeLanguage('rs')}
								className="right-side-nav__link">
								<img src={serbia} style={{ width: '40px', height: '30px' }} />
							</a>{' '}
							<a
								onClick={() => changeLanguage('en')}
								className="right-side-nav__link">
								<img src={uk} style={{ width: '30px', height: '30px' }} />
							</a>
						</div>
					</nav>
				</React.Fragment>
			)}
		</aside>
	);
};

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOut())
});
const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RightSidenav);
