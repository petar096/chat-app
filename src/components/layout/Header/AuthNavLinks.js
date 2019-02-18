import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/authActions';
import { HOME_PAGE } from '../../../constants/routes';

const AuthNavLinks = props => {
	return (
		<React.Fragment>
			<li>
				<NavLink to={HOME_PAGE}>Home</NavLink>
			</li>
			<li>
				<a href="#" onClick={props.logout}>
					Logout
				</a>
			</li>
		</React.Fragment>
	);
};

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(signOut())
});

export default connect(
	null,
	mapDispatchToProps
)(AuthNavLinks);
