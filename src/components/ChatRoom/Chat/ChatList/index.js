import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '../../../common/SearchInput';
import {
	getChats,
	getUsersByName,
	getUserReference,
	startConversation
} from '../../../../store/actions/chatActions';
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

class ChatsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			chats: []
		};

		this.filterChats = this.filterChats.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
	}

	componentDidMount() {
		this.props.getChats(this.props.user.id).onSnapshot(snapshot => {
			this.setState({ chats: [] });
			snapshot.forEach(doc => {
				const chat = { id: doc.id };

				const userRef =
					doc.data().participants[0].id ===
					this.props.getUserReference(this.props.user.id).id
						? doc.data().participants[1]
						: doc.data().participants[0];

				userRef.get().then(user => {
					chat.otherUser = {
						id: user.id,
						...user.data()
					};

					this.setState({
						...this.state,

						chats: [...this.state.chats, chat]
					});
				});
			});
		});
	}

	// startConversation
	startConversation(firstUser, secondUser) {
		console.log('ovde');
		const first = this.props.getUserReference(firstUser);
		const second = this.props.getUserReference(secondUser);

		this.props.startConversation(first, second);
	}

	filterChats(e) {
		this.setState(
			{
				[e.target.name]: e.target.value
			},
			() => {
				const newArray = this.state.chats.filter(c => {
					console.log(c.participants);
					c.participants.includes(this.state.searchTerm);
				});

				this.setState({
					...this.state,
					chats: newArray
				});
			}
		);
	}

	handleOnClick(otherUser, id) {
		this.props.setActiveUser(otherUser);
		this.props.setActiveChat(id);
	}

	render() {
		const { chats } = this.state;
		return (
			<div className="chats-list">
				<SearchInput
					large={true}
					onChange={this.filterChats}
					name="searchTerm"
				/>
				{chats.map(({ id, otherUser }) => {
					// on click needed to create new Chat
					return (
						<ChatListItem
							key={id}
							userData={otherUser}
							onClick={() => this.props.setActiveConversation(otherUser, id)}
						/>
					);
				})}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		user: state.auth
	};
};

const mapDispatchToProps = dispatch => ({
	getChats: email => dispatch(getChats(email)),
	getUsersByName: name => dispatch(getUsersByName(name)),
	getUserReference: id => getUserReference(id),
	startConversation: (user1, user2) => startConversation(user1, user2)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatsList);
