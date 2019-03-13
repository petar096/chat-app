import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { updatePassword } from '@actions/authActions';

import InputField from '@common/InputField';
import Button from '@common/Button';

const validate = values => {
	const errors = {};

	// password validator
	if (!values.password) {
		errors.password = 'Password is Required';
	} else if (values.password.length > 15) {
		errors.password = 'Password must be 15 characters or less';
	} else if (values.password.length < 5) {
		errors.password = 'Password must be longer than 5 characters';
	}

	// rePassword validator
	if (!values.rePassword) {
		errors.rePassword = 'Re password is Required';
	} else if (values.rePassword !== values.password) {
		errors.rePassword = 'Re passoword must match password';
	}

	return errors;
};

class ChangePasswordForm extends Component {
	constructor(props) {
		super(props);
		this.changePassword = this.changePassword.bind(this);
	}

	changePassword(values) {
		console.log('tu sam');
		this.props.updatePassword(values.password.toLowerCase());
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<React.Fragment>
				<h2 className="primary-heading">User security</h2>
				<h4 className="subheading">
					Please fill the form in order to change current password
				</h4>
				<Form
					className="form"
					onSubmit={handleSubmit(this.changePassword)}
					style={{ marginTop: '4rem' }}>
					<Field
						type="password"
						name="password"
						label="New Password"
						component={InputField}
					/>
					<Field
						type="password"
						name="rePassword"
						label="Re Password"
						component={InputField}
					/>

					<Button
						text="Reset password"
						className="btn--primary btn-block"
						style={{ margin: '0 auto' }}
					/>
				</Form>
			</React.Fragment>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updatePassword: password => updatePassword(password)
});

export default connect(
	null,
	mapDispatchToProps
)(
	reduxForm({
		form: 'ProfileInfo',
		validate,
		enableReinitialize: true
	})(ChangePasswordForm)
);
