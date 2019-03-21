import React, { Component } from 'react';
import Modal from '@common/Modal';
import { getUsersByName, getUserReference } from '@actions/authActions';
import { connect } from 'react-redux';

import { createGroupChat } from '@actions/chatActions';
import Capitalize from '@helpers/Capitalize';

import Avatar from '@common/Avatar';

import './_GroupChatForm.scss';
import img from '@images/teamwork.png';
import AvatarUploader from '../../common/AvatarUploader';
import { withTranslation } from 'react-i18next';

class GroupChatForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groupName: '',
			participants: [],
			page: 1,
			searchUser: '',
			avatar: null,
			users: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.addParticipant = this.addParticipant.bind(this);
		this.removeParticipant = this.removeParticipant.bind(this);
		this.createGroupChat = this.createGroupChat.bind(this);
		this.setAvatar = this.setAvatar.bind(this);
	}

	getUsers(term) {
		this.setState({ users: [] });
		this.props
			.getUsersByName(term.toLowerCase())
			.then(snapshots => {
				snapshots.forEach(u => {
					const user = { id: u.id, ...u.data() };
					this.setState({ users: [...this.state.users, user] });
				});
			})
			.catch(err => console.log(err));
	}

	handleOnChange(e) {
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => this.getUsers(this.state.searchUser)
		);
	}

	// add participant in group
	addParticipant(usr) {
		const exists = this.state.participants.find(item => item.id === usr.id);

		if (exists) {
			return false;
		} else {
			this.setState(
				{
					participants: [...this.state.participants, usr]
				},
				() => this.setState({ searchUser: '' })
			);
		}
	}

	// remove participant from group
	removeParticipant(id) {
		this.setState({
			participants: this.state.participants.filter(p => p.id !== id)
		});
	}

	// get avatar for group chat
	setAvatar(url) {
		this.setState({ avatar: url });
	}

	// creating group chat
	createGroupChat(e) {
		e.preventDefault();
		// rifst user is logged user
		const participants = [this.props.getUserReference(this.props.user.id)];

		this.state.participants.forEach(p =>
			participants.push(this.props.getUserReference(p.id))
		);

		this.props.createGroupChat(
			this.state.groupName,
			participants,
			this.state.avatar
		);
		this.props.clearState();
	}

	render() {
		const { t } = this.props;
		return (
			<Modal>
				<div className="group-chat-form">
					<form
						onSubmit={this.createGroupChat}
						style={{ display: 'flex', flexDirection: 'column' }}>
						{this.state.page === 1 ? (
							<React.Fragment>
								<div className="group-chat-form__header">
									<a className="close-btn" onClick={this.props.clearState}>
										<i className="fa fa-times" />
									</a>
									<h4
										className="subheading"
										style={{ flex: '2', textAlign: 'left' }}>
										{t('newGroup')}
									</h4>
								</div>
								<div className="group-icon-container">
									<a className="group-icon">
										<AvatarUploader
											avatar={img}
											setGroupAvatar={this.setAvatar}
											group={true}
										/>
									</a>
								</div>
								<div
									className="field field--small"
									style={{ margin: '2rem auto 0 auto ' }}>
									<input
										name="groupName"
										type="text"
										className="field__input"
										placeholder="&nbsp;"
										onChange={this.handleOnChange}
									/>
									<span className="field__label">{t('groupName')}</span>
								</div>
								<button
									disabled={!this.state.groupName}
									className="button-next"
									onClick={() =>
										this.setState({
											page: this.state.page + 1
										})
									}>
									<i className="fa fa-long-arrow-right" />
								</button>
							</React.Fragment>
						) : null}

						{this.state.page === 2 ? (
							<React.Fragment>
								<div className="group-chat-form__header">
									<a className="close-btn" onClick={this.props.clearState}>
										<i className="fa fa-times" />
									</a>
									<h4
										className="subheading"
										style={{ flex: '2', textAlign: 'left' }}>
										{t('newGroup')} : <strong>{this.state.groupName}</strong>
									</h4>
								</div>
								<div
									className="field field--small "
									style={{ margin: '0 auto', marginTop: '3rem' }}>
									<input
										name="searchUser"
										type="text"
										className="field__input"
										value={this.state.searchUser}
										placeholder="&nbsp;"
										onChange={this.handleOnChange}
									/>
									<span className="field__label">{t('findUsers')}</span>
								</div>
								<div className="group-participants">
									{this.state.participants.map(usr => {
										return (
											<a
												key={usr.id}
												style={{ padding: '1rem', cursor: 'pointer' }}
												onClick={() => this.removeParticipant(usr.id)}>
												<Avatar src={usr.avatar} />
											</a>
										);
									})}
								</div>
								<div className="users-list">
									{this.state.users.map(user => {
										return (
											<div
												key={user.id}
												className="users-list__item"
												onClick={() => this.addParticipant(user)}>
												<Avatar src={user.avatar} />
												<div className="users-list__item__details">
													{Capitalize(user.firstName)}{' '}
													{Capitalize(user.lastName)}{' '}
												</div>
											</div>
										);
									})}
								</div>
								<button
									className="button-next btn-success"
									type="submit"
									disabled={this.state.participants.length < 2}>
									<i className="fa fa-check" />
								</button>
								<button
									className="button-prev"
									type="button"
									onClick={() =>
										this.setState({
											page: this.state.page - 1
										})
									}>
									<i className="fa fa-long-arrow-left" />
								</button>
							</React.Fragment>
						) : null}
					</form>
				</div>
			</Modal>
		);
	}
}
const mapStateToProps = state => ({
	user: state.auth
});
const mapDispatchToProps = () => ({
	getUsersByName: name => getUsersByName(name),
	getUserReference: id => getUserReference(id),
	createGroupChat: (groupName, participants, avatar) =>
		createGroupChat(groupName, participants, avatar)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTranslation()(GroupChatForm));
