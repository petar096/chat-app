import React from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '@common/SearchInput';
import groupImage from '@images/teamwork.png';
import PropTypes from 'prop-types';

const ChatsList = ({
	chats,
	users,
	searchTerm,
	handleChange,
	setActiveConversation,
	setActiveUser,
	toggleChatForm,
	showChatOnSmall,
	toggleShowChatOnSmall
}) => {
	return (
		<div
			className={`chats-list ${showChatOnSmall ? '' : 'chats-list--opened'}`}>
			<SearchInput
				large={true}
				onChange={handleChange}
				name="searchTerm"
				autoComplete="off"
				value={searchTerm}
			/>
			<div style={{ display: 'flex' }}>
				<button className="addChat" onClick={() => toggleChatForm()}>
					<i className="fa fa-plus" /> Add chat
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
							const showData =
								data.groupName || null ? data.groupName : data.otherUser;

							if (data.otherUser) {
								return (
									<ChatListItem
										key={data.id}
										data={showData}
										img={data.otherUser.avatar}
										onClick={() => {
											setActiveConversation(data);
											toggleShowChatOnSmall();
										}}
									/>
								);
							} else
								return (
									<ChatListItem
										key={data.id}
										data={showData}
										img={data.avatar ? data.avatar : groupImage}
										onClick={() => {
											setActiveConversation(data);
											toggleShowChatOnSmall();
										}}
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
								img={data.avatar}
								onClick={() => {
									setActiveUser(data);
									toggleShowChatOnSmall();
								}}
							/>
						);
					})}
				</React.Fragment>
			)}
		</div>
	);
};

ChatsList.propTypes = {
	chats: PropTypes.array,
	users: PropTypes.array,
	searchTerm: PropTypes.string,
	handleChange: PropTypes.func,
	setActiveConversation: PropTypes.func,
	toggleChatForm: PropTypes.func
};

export default ChatsList;
