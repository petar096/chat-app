import React from 'react';
import { connect } from 'react-redux';
import AuthNavLinks from './AuthNavLinks';
import NonAuthNavLinks from './NonAuthNavLinks';

const Header = ({ isAuthenticated }) => (
	<header>{isAuthenticated ? <AuthNavLinks /> : <NonAuthNavLinks />}</header>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(Header);
