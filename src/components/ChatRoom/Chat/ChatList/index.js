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
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			chats: [],
			users: []
		};

		this.filterChats = this.filterChats.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUsers = debounce(this.getUsers.bind(this), 200);
	}

	componentDidMount() {
		this.props.getChats(this.props.user.id).onSnapshot(snapshot => {
			this.setState({ chats: [] });
			snapshot.forEach(doc => {
				const chat = { id: doc.id };

				// get reference to other user from database
				const userRef =
					doc.data().participants[0].id ===
					this.props.getUserReference(this.props.user.id).id
						? doc.data().participants[1]
						: doc.data().participants[0];

				// get user data from reference
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
		const first = this.props.getUserReference(firstUser);
		const second = this.props.getUserReference(secondUser);

		this.props.startConversation(first, second);
	}

	// to be done`
	filterChats(e) {}

	getUsers(term) {
		this.setState({ users: [] });
		this.props
			.getUsersByName(term)
			.then(snapshots => {
				snapshots.forEach(u => {
					const user = { id: u.id, ...u.data() };
					this.setState({ users: [...this.state.users, user] });
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

	render() {
		const { chats } = this.state;
		return (
			<div className="chats-list">
				<SearchInput
					large={true}
					onChange={this.handleChange}
					name="searchTerm"
					autoComplete="off"
				/>
				{this.state.chats.length === 0 ? null : (
					<React.Fragment>
						<h2 className="subheading">Conversations</h2>
						{chats.map(({ id, otherUser }) => {
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

				{this.state.users.length === 0 ? null : (
					<React.Fragment>
						<h2 className="subheading">Users</h2>
						{this.state.users.map(data => (
							<ChatListItem
								key={data.id}
								userData={data}
								onClick={() => this.props.setActiveUser(data)}
							/>
						))}
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
	getChats: email => dispatch(getChats(email)),
	getUsersByName: name => getUsersByName(name),
	getUserReference: id => getUserReference(id),
	startConversation: (user1, user2) => startConversation(user1, user2)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatsList);
