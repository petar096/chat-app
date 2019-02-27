import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '../../../common/SearchInput';
import { connect } from 'react-redux';

class ChatsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filteredChats: []
		};
	}
	componentDidMount() {
		console.log(this.props.chats);
	}

	render() {
		return (
			<div className="chats-list">
				<SearchInput large={true} />
				{this.props.chats.map(() => {})}
				<ChatListItem />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		chats: state.chats
	};
};

export default connect(mapStateToProps)(ChatsList);
