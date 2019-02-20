import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions/authActions';

import { SIGN_IN } from '../../../constants/routes';
import { Field, reduxForm, Form } from 'redux-form';

import InputField from '../../common/InputField';
import Button from '../../common/Button';
import Footer from '../../layout/Footer';

import './_SignUp.scss';

const validate = values => {
	const errors = {};
	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length > 15) {
		errors.password = 'Must be 15 characters or less';
	}
	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address';
	}

	return errors;
};
const warn = values => {
	const warnings = {};
	if (values.email && values.email.includes('admin.com')) {
		console.log(values.email.includes('admin'));
		warnings.email = 'Hmm, that looks little sketchy';
	}
	return warnings;
};

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnSubmit(values) {
		let user = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			password: values.password,
			rePassword: values.rePassword,
			username: values.username
		};

		this.props.signUp(user);
	}

	// onSubmit={handleSubmit(values => {
	// 	let user = {
	// 		firstName: values.firstName,
	// 		lastName: values.lastName,
	// 		email: values.email,
	// 		password: values.password,
	// 		rePassword: values.rePassword,
	// 		username: values.username
	// 	};
	// 	console.log(user);
	// })}

	render() {
		const { handleSubmit, reset, submitting } = this.props;
		return (
			<React.Fragment>
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">Please complete to create your account</h4>

				<Form className="form" onSubmit={handleSubmit(this.handleOnSubmit)}>
					<div className="form-group-inline">
						<Field
							type="text"
							name="firstName"
							label="First Name"
							component={InputField}
							small={true}
						/>
						<Field
							type="text"
							name="lastName"
							label="Last Name"
							small={true}
							component={InputField}
						/>
					</div>
					<Field
						type="text"
						name="username"
						label="Username"
						component={InputField}
					/>

					<Field
						type="email"
						name="email"
						label="Email"
						component={InputField}
					/>
					<Field
						type="password"
						name="password"
						label="Password"
						component={InputField}
					/>
					<Field
						type="password"
						name="rePassword"
						label="Re Password"
						component={InputField}
					/>
					<Button text="Sign up" className="btn--primary" />
				</Form>
				<Link
					to={SIGN_IN}
					style={{
						display: 'block',
						textAlign: 'center',
						fontSize: '1.7rem',
						letterSpacing: '.1rem'
					}}>
					Already have account?Sign in.
				</Link>
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(
	null,
	{ signUp }
)(
	reduxForm({
		form: 'signUpForm',
		validate,
		warn
	})(SignUp)
);
