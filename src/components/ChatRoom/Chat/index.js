import React, { Component } from 'react';
import './_Chat.scss';
import ChatsList from './ChatList';
import Conversation from './Conversation';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
			activeUser: null
		};

		this.setActiveUser = this.setActiveUser.bind(this);
		this.setActiveConversation = this.setActiveConversation.bind(this);
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

	render() {
		return (
			<div className="chat-container">
				<ChatsList
					setActiveConversation={this.setActiveConversation}
					setActiveUser={this.setActiveUser}
				/>
				<Conversation
					activeUser={this.state.activeUser}
					activeChat={this.state.activeChat}
					setActiveConversation={this.setActiveConversation}
				/>
			</div>
		);
	}
}

export default Chat;
