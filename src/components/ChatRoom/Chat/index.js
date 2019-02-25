import React, { Component } from 'react';
import './_Chat.scss';
import ChatsList from './ChatList';
import Conversation from './Conversation';

class Chat extends Component {
	render() {
		return (
			<div className="chat-container">
				<ChatsList />
				<Conversation />
			</div>
		);
	}
}

export default Chat;
