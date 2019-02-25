import React from 'react';
import { connect } from 'react-redux';
import AuthNavLinks from './AuthNavLinks';
import NonAuthNavLinks from './NonAuthNavLinks';

import './_Header.scss';
import SearchInput from '../../common/SearchInput';

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
