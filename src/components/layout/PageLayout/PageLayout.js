// import React from 'react';
import Sidenav from '../Sidebar';
import Header from '../Header/Header';
import './_PageLayout.scss';

// const PageLayout = ({ content }) => {
// 	return (
// 		<div className="page-layout">
// 			<Sidenav />
// 			<div className="dashboard-container">
// 				<Header />
// 				<main className="site-content">{content}</main>
// 			</div>
// 		</div>
// 	);
// };
// export default PageLayout;

import React, { Component } from 'react';

class PageLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leftSidebar: false,
			topSubMenu: false
		};

		this.toggleLeftSidenav = this.toggleLeftSidenav.bind(this);
		this.toggleNavbarSubMenu = this.toggleNavbarSubMenu.bind(this);
	}

	toggleLeftSidenav() {
		this.setState({
			leftSidebar: !this.state.leftSidebar
		});
	}

	toggleNavbarSubMenu() {
		this.setState({
			topSubMenu: !this.state.topSubMenu
		});
	}

	render() {
		return (
			<div className="page-layout">
				<Sidenav opened={this.state.leftSidebar} />
				<div className="dashboard-container">
					<Header
						toggleLeftSidenav={this.toggleLeftSidenav}
						toggleNavbarSubMenu={this.toggleNavbarSubMenu}
						topSubMenu={this.state.topSubMenu}
					/>
					<main className="site-content">{this.props.content}</main>
				</div>
			</div>
		);
	}
}
export default PageLayout;
