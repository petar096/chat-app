import React from 'react';
import PropTypes from 'prop-types';

import serbia from '@images/default.jpg';

const AuthImage = ({ src }) => (
	<img
		className="auth-page__image"
		src={src ? src : serbia}
		alt="cover photo"
	/>
);

AuthImage.propTypes = {
	src: PropTypes.string
};

export default AuthImage;
