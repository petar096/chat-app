import React from 'react';
import Capitalize from '@helpers/Capitalize';
import Avatar from '@common/Avatar';
import groupImage from '@images/teamwork.png';

const ChatHeader = ({
	activeChat,
	activeUser,
	clearState,
	toggleShowChatOnSmall
}) => {
	if (!activeChat && activeUser) {
		return (
			<div className="conversation__header">
				<Avatar src={activeUser.avatar} large={true} />
				<div className="conversation__header__details">
					<span className="conversation__username">
						{`${Capitalize(activeUser.firstName)} ${Capitalize(
							activeUser.lastName
						)}`}
					</span>
					<span className="conversation__user-detail">Account menager</span>

					<a onClick={toggleShowChatOnSmall} className="conversations-list">
						<i className="fa fa-comments" />
					</a>
					<a className="close" onClick={clearState}>
						<i className="fa fa-times" />
					</a>
				</div>
			</div>
		);
	} else {
		return (
			<div className="conversation__header">
				{activeChat.otherUser ? (
					<Avatar src={activeChat.otherUser.avatar} size="lg" />
				) : (
					<Avatar
						src={activeChat.avatar ? activeChat.avatar : groupImage}
						size="lg"
					/>
				)}
				<div className="conversation__header__details">
					<span className="conversation__username">
						{activeChat.otherUser
							? `${Capitalize(activeChat.otherUser.firstName)}  ${Capitalize(
									activeChat.otherUser.lastName
							  )}`
							: activeChat.groupName}
					</span>
					<span className="conversation__user-detail">
						{' '}
						{activeChat.otherUser
							? 'Account menager'
							: `${activeChat.participants.length} participants`}
					</span>

					<a onClick={toggleShowChatOnSmall} className="conversations-list">
						<i className="fa fa-comments" />
					</a>
					<a className="close" onClick={clearState}>
						<i className="fa fa-times" />
					</a>
				</div>
			</div>
		);
	}
};

export default ChatHeader;
