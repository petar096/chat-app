import React from 'react';
import './_Button.scss';
import PropTypes from 'prop-types';

const Button = ({ text, className = '' }) => {
  return (
    <button href="#" className={`btn ${className}`}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export default Button;
