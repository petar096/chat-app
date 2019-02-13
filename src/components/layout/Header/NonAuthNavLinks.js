import React from 'react';
import { NavLink } from 'react-router-dom';
import { SIGN_IN, SIGN_UP } from '../../../constants/routes';

const NonAuthNavLinks = () => {
	return (
		<React.Fragment>
			<li>
				<NavLink to={SIGN_IN} activeClassName="active">
					Log in
				</NavLink>
			</li>
			<li>
				<NavLink to={SIGN_UP} activeClassName="active">
					Sign up
				</NavLink>
			</li>
		</React.Fragment>
	);
};

export default NonAuthNavLinks;
