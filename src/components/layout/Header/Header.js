import React from 'react';
import { connect } from 'react-redux';
import AuthNavLinks from './AuthNavLinks';
import NonAuthNavLinks from './NonAuthNavLinks';
import SearchInput from '@common/SearchInput';

import './_Header.scss';

const Header = ({ isAuthenticated }) => (
	<header className="header">
		<SearchInput />
		<nav className="nav">
			{isAuthenticated ? <AuthNavLinks /> : <NonAuthNavLinks />}
		</nav>
	</header>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(Header);
