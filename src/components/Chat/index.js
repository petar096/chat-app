import React, { Component } from 'react';
import './_Chat.scss';
import ChatsList from './ChatList';
import Conversation from './Conversation';
import { getChats } from '@actions/chatActions';
import { getUsersByName, getUserReference } from '@actions/authActions';
import { connect } from 'react-redux';
import GroupChatForm from './GroupChatForm';

import debounce from '@helpers/debounce';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
			activeUser: null,
			searchTerm: '',
			chats: [],
			users: [],
			openChatGroup: false
		};

		this.setActiveUser = this.setActiveUser.bind(this);
		this.setActiveConversation = this.setActiveConversation.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUsers = debounce(this.getUsers.bind(this), 200);
		this.clearSearchTerm = this.clearSearchTerm.bind(this);
		this.clearState = this.clearState.bind(this);
		this.toggleChatForm = this.toggleChatForm.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;

		this.props.getChats(user.id).onSnapshot(snapshot => {
			this.setState({ chats: [] });
			snapshot.forEach(doc => {
				const chat = { id: doc.id };

				// check if chat has groupName & set groupName in state
				if (doc.data().groupName) {
					chat.groupName = doc.data().groupName;
					chat.participants = doc.data().participants;
					chat.avatar = doc.data().avatar;

					this.setState({
						chats: [...this.state.chats, chat]
					});
				} else {
					// get reference to other user from database
					const userRef =
						doc.data().participants[0].id ===
						this.props.getUserReference(user.id).id
							? doc.data().participants[1]
							: doc.data().participants[0];

					// get user data from reference
					userRef.get().then(u => {
						chat.otherUser = {
							id: u.id,
							...u.data()
						};

						this.setState({
							...this.state,

							chats: [...this.state.chats, chat]
						});
					});
				}
			});
		});
	}

	// componentWillUnmount() {
	// 	this.listener();
	// }

	toggleChatForm() {
		this.setState({
			openChatGroup: !this.state.openChatGroup
		});
	}

	getUsers(term) {
		// console.log('here');
		this.setState({ users: [] });
		this.props
			.getUsersByName(term.toLowerCase())
			.then(snapshots => {
				snapshots.forEach(u => {
					if (
						!this.state.chats.find(c => !c.groupName && c.otherUser.id === u.id)
					) {
						console.log('ovde');
						const user = { id: u.id, ...u.data() };
						this.setState({ users: [...this.state.users, user] });
					}
				});
			})
			.catch(err => console.log(err));
	}

	handleChange(e) {
		this.setState(
			{
				searchTerm: e.target.value
			},
			() => this.getUsers(this.state.searchTerm)
		);
	}
	setActiveUser(user) {
		this.setState({
			activeUser: user,
			activeChat: null
		});
	}

	setActiveConversation(data) {
		this.setState({
			activeChat: data,
			activeUser: null
		});
	}

	clearSearchTerm() {
		this.setState({
			...this.state,
			searchTerm: '',
			users: []
		});
	}

	clearState() {
		this.setState({
			activeUser: null,
			activeChat: null,
			searchTerm: '',
			users: [],
			openChatGroup: false
		});
	}

	render() {
		return (
			<div className="chat-container">
				<ChatsList
					setActiveConversation={this.setActiveConversation}
					setActiveUser={this.setActiveUser}
					users={this.state.users}
					chats={this.state.chats}
					searchTerm={this.state.searchTerm}
					handleChange={this.handleChange}
					toggleChatForm={this.toggleChatForm}
				/>
				<Conversation
					activeUser={this.state.activeUser}
					activeChat={this.state.activeChat}
					setActiveConversation={this.setActiveConversation}
					clearSearchTerm={this.clearSearchTerm}
					clearState={this.clearState}
				/>
				{this.state.openChatGroup ? (
					<GroupChatForm clearState={this.clearState} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth
	};
};

const mapDispatchToProps = () => ({
	getChats: email => getChats(email),
	getUsersByName: name => getUsersByName(name),
	getUserReference: id => getUserReference(id)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Chat);
