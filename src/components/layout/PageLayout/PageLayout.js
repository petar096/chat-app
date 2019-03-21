import React, { Component } from 'react';
import Sidenav from '../Sidebar';
import Header from '../Header/Header';
import RightSidenav from '../RightSidenav';
import './_PageLayout.scss';

class PageLayout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leftSidebar: false,
			topSubMenu: false,
			rightSidebar: false
		};

		this.toggleLeftSidenav = this.toggleLeftSidenav.bind(this);
		this.toggleNavbarSubMenu = this.toggleNavbarSubMenu.bind(this);
		this.toggleRightSidenav = this.toggleRightSidenav.bind(this);
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

	toggleRightSidenav() {
		this.setState({
			rightSidebar: !this.state.rightSidebar
		});
	}

	render() {
		return (
			<div className="page-layout">
				<Sidenav opened={this.state.leftSidebar} />
				<RightSidenav opened={this.state.rightSidebar} />
				<div className="dashboard-container">
					<Header
						toggleLeftSidenav={this.toggleLeftSidenav}
						toggleNavbarSubMenu={this.toggleNavbarSubMenu}
						toggleRightSidenav={this.toggleRightSidenav}
						topSubMenu={this.state.topSubMenu}
					/>
					<main className="site-content">{this.props.content}</main>
				</div>
			</div>
		);
	}
}
export default PageLayout;
