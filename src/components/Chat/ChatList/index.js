import React from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '@common/SearchInput';
import img from '@images/46.jpg';

const ChatsList = ({
	chats,
	users,
	searchTerm,
	handleChange,
	setActiveConversation,
	setActiveUser,
	toggleChatForm
}) => {
	return (
		<div className="chats-list">
			<SearchInput
				large={true}
				onChange={handleChange}
				name="searchTerm"
				autoComplete="off"
				value={searchTerm}
			/>
			<div style={{ display: 'flex' }}>
				<button className="addChat" onClick={() => toggleChatForm()}>
					<i className="fa fa-plus-circle" /> Add chat
				</button>
			</div>
			{/* chats collection */}
			{chats.length === 0 ? null : (
				<React.Fragment>
					<h2 className="subheading">Conversations</h2>
					{chats
						.filter(
							data => {
								let term = data.groupName
									? data.groupName.toLowerCase()
									: data.otherUser.firstName.toLowerCase();
								return term.includes(searchTerm.toLowerCase());
							}
							// otherUser.firstName
							// 	.toLowerCase()
							// 	.includes(searchTerm.toLowerCase())
						)
						.map(data => {
							const showData = data.groupName ? data.groupName : data.otherUser;
							return (
								<ChatListItem
									key={data.id}
									data={showData}
									img={data.avatar ? data.avatar : data.otherUser.avatar}
									onClick={() => setActiveConversation(data)}
								/>
							);
						})}
				</React.Fragment>
			)}
			{/* users collection */}
			{users.length === 0 ? null : (
				<React.Fragment>
					<h2 className="subheading">Users</h2>
					{users.map(data => {
						console.log(data);
						return (
							<ChatListItem
								key={data.id}
								data={data}
								img={data.avatar}
								onClick={() => setActiveUser(data)}
							/>
						);
					})}
				</React.Fragment>
			)}
		</div>
	);
};
export default ChatsList;
