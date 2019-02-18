import React from 'react';
import './_Button.scss';
import PropTypes from 'prop-types';

const Button = ({ text, className = '', onClick, type }) => {
	return (
		<button
			href="#"
			type={type}
			className={`btn ${className}`}
			onClick={onClick ? onClick : null}>
			{text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	className: PropTypes.string
};

export default Button;
