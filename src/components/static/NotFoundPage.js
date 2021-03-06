import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_PAGE } from '../../constants/routes';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
	const { t } = useTranslation();

	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<div style={{ margin: 'auto' }}>
				<h1 className="primary-heading">Error 404.</h1>
				<h3 className="subheading">{t('notFoundPage')}</h3>
				<Link
					to={HOME_PAGE}
					className="subheading"
					style={{ display: 'block' }}>
					{t('returnBack')}
				</Link>
			</div>
		</div>
	);
};
export default NotFoundPage;
