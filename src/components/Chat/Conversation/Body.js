import React from 'react';
import Message from './Message';
import { WellcomeSection } from './index';
const ChatBody = ({ messages, chatContainer, activeChat, user }) => {
	if (activeChat) {
		return (
			<div className="conversation__body" ref={chatContainer}>
				{messages.map((msg, i) => {
					return (
						<Message
							key={i + 1}
							text={msg.text}
							avatar={activeChat.groupName ? msg.avatar : null}
							autor={msg.sender === user.email ? true : false}
							time={msg.time}
						/>
					);
				})}
			</div>
		);
	} else {
		return <WellcomeSection button={false} />;
	}
};
export default ChatBody;
