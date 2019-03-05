import React, { Component } from 'react';
import './_Chat.scss';
import ChatsList from './ChatList';
import Conversation from './Conversation';
import { getChats, getUserReference } from '../../../store/actions/chatActions';
import { getUsersByName } from '../../../store/actions/authActions';
import { connect } from 'react-redux';

const debounce = (fn, delay) => {
	let timer = null;
	return function(...args) {
		const context = this;
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
};

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
			activeUser: null,
			searchTerm: '',
			chats: [],
			users: []
		};

		this.setActiveUser = this.setActiveUser.bind(this);
		this.setActiveConversation = this.setActiveConversation.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUsers = debounce(this.getUsers.bind(this), 200);
		this.clearSearchTerm = this.clearSearchTerm.bind(this);
		this.clearState = this.clearState.bind(this);
	}

	componentDidMount() {
		const { user } = this.props;

		this.props.getChats(user.id).onSnapshot(snapshot => {
			this.setState({ chats: [] });
			snapshot.forEach(doc => {
				const chat = { id: doc.id };

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
			});
		});
	}

	getUsers(term) {
		this.setState({ users: [] });
		this.props
			.getUsersByName(term)
			.then(snapshots => {
				snapshots.forEach(u => {
					if (!this.state.chats.find(c => c.otherUser.id === u.id)) {
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
	setActiveChat(id) {
		this.setState({
			...this.state,
			activeChat: id
		});
	}

	setActiveConversation(user, id) {
		this.setState({
			activeChat: id,
			activeUser: user
		});
	}

	clearSearchTerm() {
		console.log(this.state.searchTerm);
		this.setState({
			...this.state,
			searchTerm: '',
			users: []
		});
	}

	clearState() {
		console.log('clearing state');
		this.setState({
			activeUser: null,
			activeChat: null,
			searchTerm: '',
			users: []
		});
	}

	render() {
		return (
			<div className="chat-container">
				<ChatsList
					setActiveConversation={this.setActiveConversation}
					setActiveUser={this.setActiveUser}
					activeChat={this.state.activeChat}
					users={this.state.users}
					chats={this.state.chats}
					searchTerm={this.state.searchTerm}
					handleChange={this.handleChange}
				/>
				<Conversation
					activeUser={this.state.activeUser}
					activeChat={this.state.activeChat}
					setActiveConversation={this.setActiveConversation}
					clearSearchTerm={this.clearSearchTerm}
					clearState={this.clearState}
				/>
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

// export default Chat;
