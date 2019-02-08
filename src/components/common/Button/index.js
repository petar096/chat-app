import React from 'react';
import './_Button.scss';

const Button = ({ text, className = '' }) => {
  return (
    <button href="#" className={`btn ${className}`}>
      {text}
    </button>
  );
};

export default Button;
