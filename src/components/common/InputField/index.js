import React from 'react';

const InputField = props => (
	<div className={props.small ? 'field field-small' : 'field'}>
		<input
			name={props.name}
			type={props.type}
			value={props.value}
			className="field__input"
			onChange={props.onChange}
			placeholder="&nbsp;"
		/>
		<span class="field__label">{props.label}</span>
	</div>
);

export default InputField;
