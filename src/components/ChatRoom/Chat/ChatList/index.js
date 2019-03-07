import React from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '@common/SearchInput';

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
			<div>
				<button onClick={() => toggleChatForm()}>New chat</button>
			</div>
			{/* chats collection */}
			{chats.length === 0 ? null : (
				<React.Fragment>
					<h2 className="subheading">Conversations</h2>
					{chats
						// .filter(({ otherUser }) =>
						// 	otherUser.firstName
						// 		.toLowerCase()
						// 		.includes(searchTerm.toLowerCase())
						// )
						.map(({ id, otherUser }) => {
							return (
								<ChatListItem
									key={id}
									userData={otherUser}
									onClick={() => setActiveConversation(otherUser, id)}
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
						return (
							<ChatListItem
								key={data.id}
								userData={data}
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
