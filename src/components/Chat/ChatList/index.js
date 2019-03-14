import React from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '@common/SearchInput';
import userImage from '@images/46.jpg';
import groupImage from '@images/teamwork.png';

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
						.filter(data => {
							let term = data.groupName
								? data.groupName.toLowerCase()
								: data.otherUser.firstName.toLowerCase();
							return term.includes(searchTerm.toLowerCase());
						})
						.map(data => {
							const showData = data.groupName ? data.groupName : data.otherUser;

							if (data.otherUser) {
								return (
									<ChatListItem
										key={data.id}
										data={showData}
										img={
											data.otherUser.avatar ? data.otherUser.avatar : userImage
										}
										onClick={() => setActiveConversation(data)}
									/>
								);
							} else
								return (
									<ChatListItem
										key={data.id}
										data={showData}
										img={data.avatar ? data.avatar : groupImage}
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
						return (
							<ChatListItem
								key={data.id}
								data={data}
								img={data.avatar ? data.avatar : userImage}
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
