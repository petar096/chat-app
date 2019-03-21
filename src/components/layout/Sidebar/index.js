import React from 'react';
import { NavLink } from 'react-router-dom';
import './_Sidebar.scss';
import { useTranslation } from 'react-i18next';

const Sidenav = ({ opened }) => {
	const { t, i18n } = useTranslation();

	const routes = [
		{ icon: 'fa fa-home', text: t('rooms'), path: '/404' },
		{ icon: 'fa fa-envelope-o', text: t('rooms'), path: '/404' },
		{ icon: 'fa fa-product-hunt', text: t('products'), path: '/404' },
		{ icon: 'fa fa-bar-chart', text: t('invoices'), path: '/404' },
		{ icon: 'fa fa-user-o', text: t('customers'), path: '/404' },
		{ icon: 'fa fa-comments-o', text: t('chatroom'), path: 'chatroom' },
		{ icon: 'fa fa-calendar', text: t('calendar'), path: '/404' },
		{ icon: 'fa fa-cog', text: t('settings'), path: '/profile' }
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
