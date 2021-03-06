export const validate = values => {
	const errors = {};

	// password validator
	if (!values.password) {
		errors.password = 'Password is Required';
	} else if (values.password.length > 15) {
		errors.password = 'Must be 15 characters or less';
	} else if (values.password.length < 3) {
		errors.password = 'Must be longer than 3 characters';
	}
	// email validator
	if (!values.email) {
		errors.email = 'Email is Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	return errors;
};
export const warn = values => {
	const warnings = {};
	if (values.email && values.email.includes('admin.com')) {
		warnings.email = 'Hmm, that looks little sketchy';
	}
	return warnings;
};
