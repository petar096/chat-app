import React from 'react';
import './_InputField.scss';
import PropTypes from 'prop-types';

const InputField = ({
  name,
  type,
  value,
  onChange,
  label,
  small,
  required
}) => (
  <div className={small ? 'field field-small' : 'field'}>
    <input
      name={name}
      type={type}
      value={value}
      className="field__input"
      onChange={onChange}
      required={required}
      placeholder="&nbsp;"
    />
    <span class="field__label">{label}</span>
  </div>
);

InputField.propType = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  small: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default InputField;
