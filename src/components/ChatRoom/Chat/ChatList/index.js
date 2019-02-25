import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '../../../common/SearchInput';
class ChatsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chats: []
		};
	}

	render() {
		return (
			<div className="chats-list">
				<SearchInput large={true} />
				<ChatListItem />
				<ChatListItem />
				<ChatListItem />
			</div>
		);
	}
}
export default ChatsList;
