import React from 'react';
import './_InputField.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const InputField = ({
	input,
	type,
	// value,
	// onChange,
	label,
	small,
	meta: { touched, error, warning }
}) => (
	<div className={small ? 'field field-small' : 'field'}>
		<input
			// autoFocus={autofocus}
			{...input}
			name={name}
			type={type}
			// value={value}
			className={classNames('field__input', {
				'field__input--error': touched && error,
				'field__input--warning': touched && warning
			})}
			// onChange={onChange}
			// required={required}
			placeholder="&nbsp;"
		/>
		<span className="field__label">{label}</span>
		{touched &&
			((error && (
				<span className="error">
					<i className="fa fa-times-circle" /> {error}
				</span>
			)) ||
				(warning && (
					<span className="warning">
						<i className="fa fa-exclamation-circle" /> {warning}
					</span>
				)))}
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
