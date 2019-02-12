import React from 'react';
import { Link } from 'react-router-dom';
import { HOME } from '../constants/routes';

const AuthNavLinks = () => {
	return (
		<ul>
			<Link to={HOME}>Home</Link>
		</ul>
	);
};
export default AuthNavLinks;
