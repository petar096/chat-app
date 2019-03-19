import React from 'react';
import { NavLink } from 'react-router-dom';
import './_Sidebar.scss';

const Sidenav = ({ opened }) => {
	const routes = [
		{ icon: 'fa fa-home', text: 'Rooms', path: '/404' },
		{ icon: 'fa fa-envelope-o', text: 'Inbox', path: '/404' },
		{ icon: 'fa fa-product-hunt', text: 'Products', path: '/404' },
		{ icon: 'fa fa-bar-chart', text: 'Invoices', path: '/404' },
		{ icon: 'fa fa-user-o', text: 'Customers', path: '/404' },
		{ icon: 'fa fa-comments-o', text: 'Chat Room', path: 'chatroom' },
		{ icon: 'fa fa-calendar', text: 'Calendar', path: '/404' },
		{ icon: 'fa fa-cog', text: 'Settings', path: '/profile' }
	];
	return (
		<React.Fragment>
			<aside className={`sidenav ${opened ? 'sidenav--opened' : ''}`}>
				<div className="logo-div">
					<span className="logo-normal">Food-order</span>
					<span className="logo-sm">F</span>
				</div>

				<nav className="sidenav-links--normal">
					{routes.map((route, i) => (
						<NavLink to={route.path} className="sidenav__link" key={i + 1}>
							<i className={route.icon} /> {route.text}
						</NavLink>
					))}
				</nav>

				<nav className="sidenav-links--sm">
					{routes.map((route, i) => (
						<NavLink to={route.path} className="sidenav__link" key={i + 1}>
							<i className={route.icon} />
						</NavLink>
					))}
				</nav>
			</aside>
		</React.Fragment>
	);
};
export default Sidenav;
