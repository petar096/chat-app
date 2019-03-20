import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '@actions/authActions';
import Avatar from '@common/Avatar';
import Capitalize from '@helpers/Capitalize';

import './_RightSidenav.scss';

const RightSidenav = props => {
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
							My profile
						</NavLink>
						<a onClick={props.logout} className="right-side-nav__link">
							Logout
						</a>
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
