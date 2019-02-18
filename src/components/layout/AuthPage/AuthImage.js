import React from 'react';
import PropTypes from 'prop-types';
import defaultImg from '../../../images/default.jpg';

const AuthImage = ({ src }) => (
	<img
		className="auth-page__image"
		src={src}
		onError={e => (e.target.src = defaultImg)}
		alt="auth"
	/>
);

AuthImage.propTypes = {
	src: PropTypes.string
};

export default AuthImage;
