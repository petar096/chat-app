import React from 'react';
import { NavLink } from 'react-router-dom';
import './_Sidebar.scss';

const Sidenav = () => {
	const routes = [
		{ icon: 'fa fa-home', text: 'Rooms', path: 'test' },
		{ icon: 'fa fa-envelope-o', text: 'Inbox', path: 'test' },
		{ icon: 'fa fa-product-hunt', text: 'Products', path: 'test' },
		{ icon: 'fa fa-bar-chart', text: 'Invoices', path: 'test' },
		{ icon: 'fa fa-user-o', text: 'Customers', path: 'test' },
		{ icon: 'fa fa-comments-o', text: 'Chat Room', path: 'test' },
		{ icon: 'fa fa-calendar', text: 'Calendar', path: 'test' },
		{ icon: 'fa fa-cog', text: 'Settings', path: 'test' }
	];
	return (
		<aside className="sidenav">
			{routes.map((route, i) => (
				<NavLink to={route.path} className="sidenav__link" key={i + 1}>
					<i className={route.icon} /> {route.text}
				</NavLink>
			))}
		</aside>
	);
};
export default Sidenav;
