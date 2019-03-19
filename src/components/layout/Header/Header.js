import React from 'react';
import { connect } from 'react-redux';
import AuthNavLinks from './AuthNavLinks';
import NonAuthNavLinks from './NonAuthNavLinks';
import SearchInput from '@common/SearchInput';

import './_Header.scss';

const Header = ({
	isAuthenticated,
	toggleLeftSidenav,
	toggleNavbarSubMenu,
	topSubMenu
}) => (
	<React.Fragment>
		<header className="header">
			<SearchInput className="hide-search" onClick={toggleNavbarSubMenu} />
			<nav className="nav">
				{isAuthenticated ? <AuthNavLinks /> : <NonAuthNavLinks />}
			</nav>
			<nav className="nav-mobile">
				<a className="nav-mobile__link" onClick={e => toggleLeftSidenav()}>
					<i className="fa fa-align-left" />
				</a>
				<a className="nav-mobile__link">
					<i className="fa fa-align-right" />
				</a>
				<a className="nav-mobile__link" onClick={e => toggleNavbarSubMenu()}>
					<i className="fa fa-ellipsis-v" />
				</a>
			</nav>
		</header>
		<header className={`sub-header ${topSubMenu ? 'sub-header--open' : ''}`}>
			<SearchInput />
			<nav className="sub-header__nav">
				<a href="#0" className="nav__link">
					<i className="fa fa-bullseye" />
				</a>
				<a href="#0" className="nav__link">
					<i className="fa fa-comments-o" />
				</a>
				<a href="#" className="nav__link">
					<i className="fa fa-bell" />
				</a>
			</nav>
		</header>
	</React.Fragment>
);

const mapStateToProps = state => ({
	isAuthenticated: !!state.auth.email
});

export default connect(mapStateToProps)(Header);
