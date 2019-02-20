export const validate = values => {
	const errors = {};

	// firstName validator
	if (!values.firstName) {
		errors.firstName = 'First Name is Required';
	} else if (values.firstName.length < 2) {
		errors.firstName = 'First Name must be longer than 2 characters';
	}

	// lastName validator
	if (!values.lastName) {
		errors.lastName = 'Last Name is Required';
	} else if (values.lastName.length < 2) {
		errors.lastName = 'Last Name must be longer than 2 characters';
	}

	// username validator
	if (!values.username) {
		errors.username = 'Username is Required';
	} else if (values.username.length < 2) {
		errors.username = 'Username must be longer than 2 characters';
	}

	// email validator
	if (!values.email) {
		errors.email = 'Email is Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	// password validator
	if (!values.password) {
		errors.password = 'Password is Required';
	} else if (values.password.length > 15) {
		errors.password = 'Password must be 15 characters or less';
	} else if (values.password.length < 3) {
		errors.password = 'Password must be longer than 3 characters';
	}

	// rePassword validator
	if (!values.rePassword) {
		errors.rePassword = 'Re password is Required';
	} else if (values.rePassword !== values.password) {
		errors.rePassword = 'Re passoword must match password';
	}

	return errors;
};

export const warn = values => {
	const warnings = {};

	// warnings for email
	if (values.email && values.email.includes('admin.com')) {
		warnings.email = 'Hmm, that looks little sketchy';
	}

	//warnings for password
	if (values.password && values.password.search(/\d/) === -1) {
		warnings.password = `That's easy to break enter some digits man..`;
	}

	//username for password
	if (values.username && values.username.length === 2) {
		warnings.username = `Come on man give me atleast 3`;
	}

	return warnings;
};
