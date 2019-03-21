import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '@actions/authActions';
import Avatar from '@common/Avatar';
import Capitalize from '@helpers/Capitalize';

import serbia from '@images/serbia.svg';
import uk from '@images/uk.svg';

import { useTranslation } from 'react-i18next';

const AuthNavLinks = props => {
	const { t, i18n } = useTranslation();

	const changeLanguage = lng => {
		i18n.changeLanguage(lng);
	};

	return (
		<div style={{ display: 'flex' }} className="">
			<li>
				<a href="#0" className="nav__link">
					<i className="fa fa-bullseye" />
				</a>
			</li>
			<li>
				<a href="#0" className="nav__link">
					<i className="fa fa-comments-o" />
				</a>
			</li>
			<li>
				<a href="#" className="nav__link">
					<i className="fa fa-bell" />
				</a>
			</li>
			{props.auth.firstName === '' ? (
				<p>Loading...</p>
			) : (
				<div className="user">
					<span className="user__username">
						{Capitalize(props.auth.firstName)} {Capitalize(props.auth.lastName)}
					</span>
					<i className="fa fa-chevron-down" />
					<Avatar src={props.auth.avatar} alt="User avatar image" size="sm" />
					<div className="dropdown">
						<NavLink to="/profile" className="dropdown__link">
							My profile
						</NavLink>
						<a href="#" onClick={props.logout} className="dropdown__link">
							Logout
						</a>
					</div>
				</div>
			)}
			<div className="flags">
				<a
					onClick={() => changeLanguage('rs')}
					className="right-side-nav__link">
					<img src={serbia} style={{ width: '30px', height: '20px' }} />
				</a>{' '}
				<a
					onClick={() => changeLanguage('en')}
					className="right-side-nav__link">
					<img src={uk} style={{ width: '20px', height: '20px' }} />
				</a>
			</div>
		</div>
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
)(AuthNavLinks);
