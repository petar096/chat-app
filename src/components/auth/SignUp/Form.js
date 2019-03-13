import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions/authActions';

// import { storage } from '../../../firebase/config';

import { SIGN_IN } from '../../../constants/routes';
import { Field, reduxForm, Form } from 'redux-form';
import { warn, validate } from './validate';

import InputField from '@common/InputField';
import Button from '@common/Button';
import Footer from '@layout/Footer';

import './_SignUp.scss';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avatar: ''
		};
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnSubmit(values) {
		let user = {
			firstName: values.firstName.toLowerCase(),
			lastName: values.lastName.toLowerCase(),
			email: values.email.toLowerCase(),
			password: values.password.toLowerCase(),
			rePassword: values.rePassword.toLowerCase(),
			username: values.username.toLowerCase(),
			avatar:
				'https://firebasestorage.googleapis.com/v0/b/food-order-react.appspot.com/o/Avatars%2F6f15604b-15c3-47d5-b12b-b2dbf990a626.png?alt=media&token=402af659-0630-4333-b710-e55c203a2877'
		};

		this.props.signUp(user);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<React.Fragment>
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">Please complete to create your account</h4>

				<Form className="form" onSubmit={handleSubmit(this.handleOnSubmit)}>
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
					<Button
						text="Sign up"
						className="btn--primary btn-block"
						style={{ margin: '0 auto' }}
					/>
				</Form>
				<Link to={SIGN_IN} className="have-account-link">
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
