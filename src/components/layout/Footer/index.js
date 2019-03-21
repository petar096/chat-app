import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer
			style={{
				width: '100%',
				marginTop: 'auto',
				textAlign: 'center',
				fontSize: '1.6rem',
				paddingBottom: '1rem'
			}}>
			{t('footer')}
		</footer>
	);
};
export default Footer;
