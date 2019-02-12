import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from '../../constants/routes';

const NotFoundPage = () => (
	<div>
		<h3>Page not found.</h3>
		<Link to={HOME_PAGE}>Go back to home page</Link>
	</div>
);
export default NotFoundPage;
