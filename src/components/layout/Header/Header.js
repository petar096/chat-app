import React from 'react';
import { connect } from 'react-redux';
import AuthNavLinks from './AuthNavLinks';
import NonAuthNavLinks from './NonAuthNavLinks';

import './_Header.scss';

const Header = ({ isAuthenticated }) => (
	<header className="header">
		<div className="logo">Food order</div>
		<ul className="right-nav">
			{isAuthenticated ? <AuthNavLinks /> : <NonAuthNavLinks />}
		</ul>
	</header>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(Header);
