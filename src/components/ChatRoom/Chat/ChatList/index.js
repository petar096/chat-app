import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '../../../common/SearchInput';
import {
	getChats,
	getUserReference,
	startConversation
} from '../../../../store/actions/chatActions';
import { getUsersByName } from '../../../../store/actions/authActions';
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
	// constructor(props) {
	// 	super(props);

	// 	this.state = {
	// 		searchTerm: '',
	// 		chats: [],
	// 		users: []
	// 	};

	// 	this.handleChange = this.handleChange.bind(this);
	// 	this.getUsers = debounce(this.getUsers.bind(this), 200);
	// }

	// componentDidMount() {
	// 	this.props.getChats(this.props.user.id).onSnapshot(snapshot => {
	// 		this.setState({ chats: [] });
	// 		snapshot.forEach(doc => {
	// 			const chat = { id: doc.id };

	// 			// get reference to other user from database
	// 			const userRef =
	// 				doc.data().participants[0].id ===
	// 				this.props.getUserReference(this.props.user.id).id
	// 					? doc.data().participants[1]
	// 					: doc.data().participants[0];

	// 			// get user data from reference
	// 			userRef.get().then(user => {
	// 				chat.otherUser = {
	// 					id: user.id,
	// 					...user.data()
	// 				};

	// 				this.setState({
	// 					...this.state,

	// 					chats: [...this.state.chats, chat]
	// 				});
	// 			});
	// 		});
	// 	});
	// }

	// getUsers(term) {
	// 	this.setState({ users: [] });
	// 	this.props
	// 		.getUsersByName(term)
	// 		.then(snapshots => {
	// 			snapshots.forEach(u => {
	// 				if (!this.state.chats.find(c => c.otherUser.id === u.id)) {
	// 					const user = { id: u.id, ...u.data() };
	// 					this.setState({ users: [...this.state.users, user] });
	// 				}
	// 			});
	// 		})
	// 		.catch(err => console.log(err));
	// }

	// handleChange(e) {
	// 	this.setState(
	// 		{
	// 			searchTerm: e.target.value
	// 		},
	// 		() => this.getUsers(this.state.searchTerm)
	// 	);
	// }

	render() {
		// const { chats, users } = this.state;
		const { chats, users, searchTerm, handleChange } = this.props;
		return (
			<div className="chats-list">
				<SearchInput
					large={true}
					onChange={handleChange}
					name="searchTerm"
					autoComplete="off"
					value={searchTerm}
				/>
				{chats.length === 0 ? null : (
					<React.Fragment>
						<h2 className="subheading">Conversations</h2>
						{chats
							.filter(({ otherUser }) =>
								otherUser.firstName
									.toLowerCase()
									// .includes(this.state.searchTerm.toLowerCase())
									.includes(searchTerm.toLowerCase())
							)
							.map(({ id, otherUser }) => {
								return (
									<ChatListItem
										key={id}
										userData={otherUser}
										onClick={() =>
											this.props.setActiveConversation(otherUser, id)
										}
									/>
								);
							})}
					</React.Fragment>
				)}

				{users.length === 0 ? null : (
					<React.Fragment>
						<h2 className="subheading">Users</h2>
						{users.map(data => {
							return (
								<ChatListItem
									key={data.id}
									userData={data}
									onClick={() => this.props.setActiveUser(data)}
								/>
							);
						})}
					</React.Fragment>
				)}
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
	getChats: email => getChats(email),
	getUsersByName: name => getUsersByName(name),
	getUserReference: id => getUserReference(id),
	startConversation: (user1, user2) => startConversation(user1, user2)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatsList);
