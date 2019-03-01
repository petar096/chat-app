import React, { Component } from 'react';
import './_Chat.scss';
import ChatsList from './ChatList';
import Conversation from './Conversation';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeChat: null,
			activeUser: {}
		};

		// this.setActiveUser = this.setActiveUser.bind(this);
		// this.setActiveChat = this.setActiveChat.bind(this);
		this.setActiveConversation = this.setActiveConversation.bind(this);
	}

	// setActiveUser(user) {
	// 	this.setState({
	// 		...this.state,
	// 		activeUser: user
	// 	});
	// }

	setActiveConversation(user, id) {
		this.setState({
			...this.state,
			activeChat: id,
			activeUser: user
		});
	}

	render() {
		return (
			<div className="chat-container">
				<ChatsList
					// setActiveUser={this.setActiveUser}
					// setActiveChat={this.setActiveChat}
					setActiveConversation={this.setActiveConversation}
				/>
				<Conversation
					activeUser={this.state.activeUser}
					activeChat={this.state.activeChat}
				/>
			</div>
		);
	}
}

export default Chat;
