import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import { updateUser, setUser } from '@actions/authActions';
import PropTypes from 'prop-types';

import Capitalize from '@helpers/Capitalize';

import InputField from '@common/InputField';
import Button from '@common/Button';
import AvatarUploader from '../common/AvatarUploader';
import img from '@images/user.png';

class ProfileInfo extends Component {
	constructor(props) {
		super(props);

		this.handleInitialize = this.handleInitialize.bind(this);
		this.updateUserInfo = this.updateUserInfo.bind(this);
	}

	componentDidMount() {
		this.handleInitialize();
	}

	handleInitialize() {
		const { firstName, lastName, username } = this.props.auth;

		const initData = {
			firstName: Capitalize(firstName),
			lastName: Capitalize(lastName),
			username: username
		};

		this.props.initialize(initData);
	}

	updateUserInfo({ firstName, lastName, username }) {
		const updatedValues = {
			firstName: firstName.toLowerCase(),
			lastName: lastName.toLowerCase(),
			username: username
		};

		this.props
			.updateUser(this.props.auth.id, updatedValues)
			.then(() => this.props.setUser(updatedValues));
	}

	render() {
		const { handleSubmit } = this.props;
		const { firstName, lastName, username } = this.props.initialValues;

		return (
			<React.Fragment>
				<h2 className="primary-heading">Profile information</h2>
				<AvatarUploader
					avatar={this.props.auth.avatar ? this.props.auth.avatar : img}
					size="lg"
				/>
				<Form onSubmit={handleSubmit(this.updateUserInfo)} className="form">
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
			</React.Fragment>
		);
	}
}

ProfileInfo.propTypes = {
	updateUser: PropTypes.func,
	setUser: PropTypes.func,
	initialValues: PropTypes.object,
	auth: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
	updateUser: (id, data) => updateUser(id, data),
	setUser: user => dispatch(setUser(user))
});

const mapStateToProps = state => {
	return {
		initialValues: {
			firstName: Capitalize(state.auth.firstName),
			lastName: Capitalize(state.auth.lastName),
			username: state.auth.username
		},
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({ form: 'profileInfo', enableReinitialize: true })(ProfileInfo));
