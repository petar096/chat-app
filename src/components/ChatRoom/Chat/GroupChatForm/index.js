import React, { Component } from 'react';
import Modal from '@common/Modal';
import { getUsersByName } from '@actions/authActions';
import { connect } from 'react-redux';

import './_GroupChatForm.scss';
import Avatar from '../../../common/Avatar';

class GroupChatForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			groupName: '',
			participant: [],
			page: 1,
			searchUser: '',
			users: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
	}
	getUsers(term) {
		this.setState({ users: [] });
		this.props
			.getUsersByName(term.toLowerCase())
			.then(snapshots => {
				snapshots.forEach(u => {
					console.log(u);
					const user = { id: u.id, ...u.data() };
					this.setState({ users: [...this.state.users, user] });
				});
			})
			.catch(err => console.log(err));
	}
	handleOnChange(e) {
		console.log(this.state.groupName);
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => this.getUsers(this.state.searchUser)
		);
	}
	render() {
		return (
			<Modal>
				<div className="group-chat-form">
					{this.state.page === 1 ? (
						<React.Fragment>
							<div className="group-chat-form__header">
								<a className="close-btn" onClick={this.props.clearState}>
									<i className="fa fa-times" />
								</a>
								<h4
									className="subheading"
									style={{ flex: '2', textAlign: 'left' }}>
									New Group Chat
								</h4>
							</div>
							<div className="group-icon-container" />
							<a className="group-icon">
								<Avatar />
							</a>
							<form className="form" onSubmit={e => e.preventDefault()}>
								<div className="field ">
									<input
										name="groupName"
										type="text"
										className="field__input"
										placeholder="&nbsp;"
										onChange={this.handleOnChange}
									/>
									<span className="field__label">Group Chat Name</span>
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
							</form>
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
									New Group Chat
								</h4>
							</div>
							<form className="form">
								<div className="field ">
									<input
										name="searchUser"
										type="text"
										className="field__input"
										placeholder="&nbsp;"
										onChange={this.handleOnChange}
									/>
									<span className="field__label">Find users</span>
								</div>
							</form>
							<div className="users-list">
								{this.state.users.map(user => {
									console.log(user);
									return (
										<div key={user.id} className="users-list__item">
											{user.firstName}
										</div>
									);
								})}
							</div>
						</React.Fragment>
					) : null}
				</div>
			</Modal>
		);
	}
}
const mapStateToProps = state => ({
	auth: state.auth
});
const mapDispatchToProps = () => ({
	getUsersByName: name => getUsersByName(name),
	getUserReference: id => getUserReference(id)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GroupChatForm);
