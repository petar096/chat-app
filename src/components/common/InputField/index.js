import React from 'react';
import './_InputField.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

const InputField = ({
	input,
	type,
	label,
	small,
	meta: { touched, error, warning } = null
}) => {
	if (type === 'checkbox') {
		return (
			<label className="container">
				<input type={type} name={name} {...input} />{' '}
				<span className="checkmark" />
				{label}
			</label>
		);
	} else {
		return (
			<div className={small ? 'field field--small' : 'field'}>
				<input
					{...input}
					name={name}
					type={type}
					className={classNames('field__input', {
						'field__input--error': touched && error,
						'field__input--warning': touched && warning
					})}
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
	}
};

InputField.propType = {
	name: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	small: PropTypes.string
};

export default InputField;
