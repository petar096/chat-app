import React, { Component } from 'react';
import Avatar from '../Avatar';
import FileUploader from 'react-firebase-file-uploader';
import { storage } from '../../../firebase/config';
import './_AvatarUploader.scss';
import { updateUser, setUser, getUserById } from '@actions/authActions';
import { connect } from 'react-redux';
import CircularProgressbar from 'react-circular-progressbar';

class AvatarUploader extends Component {
	constructor(props) {
		super(props);

		this.state = {
			avatarURL: '',
			isUploading: false,
			progress: 0
		};

		this.handleUploadStart = this.handleUploadStart.bind(this);
		this.handleProgress = this.handleProgress.bind(this);
		this.handleUploadError = this.handleUploadError.bind(this);
		this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
	}

	componentDidMount() {
		this.setState({
			avatarURL: this.props.avatar
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

		if (this.props.group) {
			storage
				.ref('Avatars')
				.child(filename)
				.getDownloadURL()
				.then(url => {
					this.setState(
						{
							avatarURL: url
						},
						() => this.props.setGroupAvatar(this.state.avatarURL)
					);
				});
		} else {
			storage
				.ref('Avatars')
				.child(filename)
				.getDownloadURL()
				.then(url => {
					this.setState(
						{
							avatarURL: url
						},
						() => {
							this.props
								.updateUser(this.props.auth.id, {
									...this.props.auth,
									avatar: this.state.avatarURL
								})
								.then(() => {
									getUserById(this.props.auth.id).then(data =>
										this.props.setUser(data.data())
									);
								});
						}
					);
				});
		}
	}

	render() {
		return (
			<div className="upload">
				{this.state.isUploading && (
					<CircularProgressbar percentage={this.state.progress} />
				)}
				<div className="upload__wrapper">
					<label
						htmlFor="uploadGroupAvatar"
						className="avatar-label"
						style={{
							cursor: 'pointer'
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
								height: '100%',
								width: '100%'
							}}
						/>
						<span className="camera-icon">
							<i className="fa fa-camera" aria-hidden="true" />
						</span>
					</label>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateUser: (id, data) => updateUser(id, data),
	setUser: user => dispatch(setUser(user))
});

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AvatarUploader);
