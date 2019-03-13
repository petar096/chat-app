import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '../common/Avatar';
import FileUploader from 'react-firebase-file-uploader';
import { Field, reduxForm, Form } from 'redux-form';
import { updateUser, setUser } from '@actions/authActions';
import { storage } from '../../firebase/config';

import InputField from '@common/InputField';
import Button from '@common/Button';

class ProfileInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avatarURL: '',
			isUploading: false,
			progress: 0
		};

		this.updateUser = this.updateUser.bind(this);
		this.handleUploadStart = this.handleUploadStart.bind(this);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleUploadError = this.handleUploadError.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
	}

	componentDidMount() {
		this.setState({
			avatarURL: this.props.avatar
		});

		console.log(this.props.initialValues);
	}

	updateUser(values) {
		let user = {
			firstName: values.firstName.toLowerCase(),
			lastName: values.lastName.toLowerCase(),
			username: values.username.toLowerCase(),
			avatar: this.state.avatarURL
		};

		this.props
			.updateUser(this.props.initialValues.id, user)
			.then(() => this.props.setUser(user));

		console.log(this.props);
	}

	handleOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleUploadStart() {
		this.setState({ isUploading: true, progress: 0 });
	}

	handleProgress(progress) {
		this.setState({ progress });
	}

	handleUploadError(error) {
		this.setState({ isUploading: false });
		console.error(error);
	}

	handleUploadSuccess(filename) {
		this.setState({
			image: filename,
			progress: 100
		});

		storage
			.ref('Avatars')
			.child(filename)
			.getDownloadURL()
			.then(url => {
				console.log(url);
				this.setState({
					avatarURL: url
				});
			});
	}
	render() {
		const { handleSubmit } = this.props;

		return (
			<React.Fragment>
				<h2 className="primary-heading">Profile information</h2>
				<div>
					<label
						htmlFor="uploadGroupAvatar"
						className="avatar-label"
						style={{
							cursor: 'pointer',
							position: 'relative',
							display: 'inline-block'
						}}>
						<FileUploader
							accept="image/*"
							storageRef={storage.ref('Avatars')}
							onUploadStart={this.handleUploadStart}
							onUploadError={this.handleUploadError}
							onUploadSuccess={this.handleUploadSuccess}
							onProgress={this.handleProgress}
							randomizeFilename
							hidden
							id="uploadGroupAvatar"
						/>
						<Avatar
							src={this.state.avatarURL}
							style={{
								height: '11rem',
								width: '11rem',
								border: 'none'
							}}
						/>
						<span className="camera-icon">
							<i className="fa fa-camera" aria-hidden="true" />
						</span>
					</label>
				</div>
				<Form
					className="form"
					style={{ marginTop: '5rem' }}
					onSubmit={handleSubmit(this.updateUser)}>
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

const mapStateFromProps = state => ({
	avatar: state.auth.avatar,
	initialValues: state.auth
});

const mapDispatchToProps = dispatch => ({
	updateUser: (id, data) => updateUser(id, data),
	setUser: user => dispatch(setUser(user))
});

export default connect(
	mapStateFromProps,
	mapDispatchToProps
)(
	reduxForm({
		form: 'ProfileInfo',
		enableReinitialize: true,
		keepDirtyOnReinitialize: true
	})(ProfileInfo)
);
