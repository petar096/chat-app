import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';
import FileUploader from 'react-firebase-file-uploader';
import { Field, reduxForm, Form } from 'redux-form';
import { updateUser, setUser } from '@actions/authActions';
import { storage } from '../../firebase/config';

import InputField from '@common/InputField';
import Button from '@common/Button';
import AvatarUploader from '../common/AvatarUploader';

const ProfileInfo = props => {
	const updateUser = values => {
		let user = {
			firstName: values.firstName.toLowerCase(),
			lastName: values.lastName.toLowerCase(),
			email: this.props.auth.email,
			username: values.username.toLowerCase(),
			avatar: this.state.avatarURL
		};

		props
			.updateUser(this.props.initialValues.id, user)
			.then(() => this.props.setUser(user));
	};

	const { handleSubmit } = props;
	const { firstName, lastName, username } = props.initialValues;
	return (
		<React.Fragment>
			<h2 className="primary-heading">Profile information</h2>
			<AvatarUploader avatar={props.auth.avatar} />
			<Form onSubmit={handleSubmit(updateUser)} className="form">
				<div>
					<Field
						name="firstName"
						component={InputField}
						type="text"
						placeholder={firstName}
					/>
				</div>
				<div>
					<Field
						name="lastName"
						component={InputField}
						type="text"
						placeholder={lastName}
					/>
				</div>
				<div>
					<Field
						name="username"
						component={InputField}
						type="text"
						placeholder={username}
					/>
				</div>
				<Button
					text="Update changes"
					className="btn--primary btn-block"
					style={{ margin: '0 auto' }}
				/>
			</Form>
			;
		</React.Fragment>
	);
};

const mapDispatchToProps = dispatch => ({
	updateUser: (id, data) => updateUser(id, data),
	setUser: user => dispatch(setUser(user))
});

const mapStateToProps = state => {
	return {
		initialValues: {
			firstName: state.auth.firstName,
			lastName: state.auth.lastName,
			username: state.auth.username
		},
		auth: state.auth
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({ form: 'profileInfo', enableReinitialize: true })(ProfileInfo));
