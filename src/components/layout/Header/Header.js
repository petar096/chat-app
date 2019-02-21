import React from 'react';
import { connect } from 'react-redux';
import AuthNavLinks from './AuthNavLinks';
import NonAuthNavLinks from './NonAuthNavLinks';

import './_Header.scss';

const Header = ({ isAuthenticated }) => (
	<header className="header">
		<div className="logo-div">
			<span>Food-order</span>
		</div>
		<div className="search-box">
			<i className="fa fa-search" />
			<input
				type="text"
				className="search-box__input"
				placeholder="Search for places, invoices"
			/>
		</div>
		<ul className="nav">
			{isAuthenticated ? <AuthNavLinks /> : <NonAuthNavLinks />}
		</ul>
	</header>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(Header);
