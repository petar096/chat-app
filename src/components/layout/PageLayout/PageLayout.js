import React from 'react';
import Sidenav from '../Sidebar';
import Header from '../Header/Header';
import './_PageLayout.scss';

export default function PageLayout({ content }) {
	return (
		<React.Fragment>
			<Header />
			<div className="page-layout">
				<Sidenav />
				<div className="site-content">{content}</div>
			</div>
		</React.Fragment>
	);
}
