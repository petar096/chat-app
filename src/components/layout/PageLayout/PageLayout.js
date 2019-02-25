import React from 'react';
import Sidenav from '../Sidebar';
import Header from '../Header/Header';
import './_PageLayout.scss';

const PageLayout = ({ content }) => {
	return (
		<div className="page-layout">
			<Sidenav />
			<div className="dashboard-container">
				<Header />
				<main className="site-content">{content}</main>
			</div>
		</div>
	);
};
export default PageLayout;
