import React from 'react';
import './_InputField.scss';
import PropTypes from 'prop-types';

const InputField = props => (
  <div className={props.small ? 'field field-small' : 'field'}>
    <input
      name={props.name}
      type={props.type}
      value={props.value}
      className="field__input"
      onChange={props.onChange}
      placeholder="&nbsp;"
      reguired={props.required}
    />
    <span class="field__label">{props.label}</span>
  </div>
);

InputField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  reguired: PropTypes.bool
};

export default InputField;
