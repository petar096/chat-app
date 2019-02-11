import React from 'react';
import './_Alert.scss';

const Alert = ({ type, msg }) => (
  <div
    className={
      type === 'error' ? 'alert alert--error' : 'alert alert--success'
    }>
    {msg}
  </div>
);

export default Alert;
