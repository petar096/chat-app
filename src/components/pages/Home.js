import React from 'react';
// import withAuthorization from '../../routing/PublicRoute';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<h1>Home page</h1>
			<Link to="/signin">Login</Link>
		</div>
	);
};

export default Home;
