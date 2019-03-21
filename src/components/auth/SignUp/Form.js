import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../../store/actions/authActions';

import { withTranslation } from 'react-i18next';

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
			avatar: ''
		};

		this.props.signUp(user);
	}

	render() {
		const { handleSubmit, t } = this.props;
		return (
			<React.Fragment>
				<h2 className="primary-heading">Food-order</h2>
				<h4 className="subheading">{t('registerMsg')}</h4>

				<Form className="form" onSubmit={handleSubmit(this.handleOnSubmit)}>
					<Field
						type="text"
						name="firstName"
						label={t('firstName')}
						component={InputField}
						small={true}
					/>
					<Field
						type="text"
						name="lastName"
						label={t('lastName')}
						small={true}
						component={InputField}
					/>
					<Field
						type="text"
						name="username"
						label={t('username')}
						component={InputField}
					/>

					<Field
						type="email"
						name="email"
						label={t('email')}
						component={InputField}
					/>
					<Field
						type="password"
						name="password"
						label={t('password')}
						component={InputField}
					/>
					<Field
						type="password"
						name="rePassword"
						label={t('rePassword')}
						component={InputField}
					/>
					<Button
						text={t('signUp')}
						className="btn--primary btn-block"
						style={{ margin: '0 auto' }}
					/>
				</Form>
				<Link to={SIGN_IN} className="have-account-link">
					{t('dontHaveAcc')}
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
	})(withTranslation()(SignUp))
);
