import React from 'react';
import img from '../../../../../assets/images/46.jpg';
import Avatar from '../../../../common/Avatar';

import './_Chat-list-item.scss';

const ChatListItem = props => {
	return (
		<a href="#" className="chat-list-item">
			<Avatar src={img} alt="User picture" />
			<div className="chat-list-item__content">
				<div className="chat-details">
					{' '}
					David Lee <span className="chat-details__time">3min</span>
				</div>
				<p className="last-message">loreasdmnsdnsadsandjssdkjsbaskjsabdj</p>
			</div>
		</a>
	);
};

export default ChatListItem;
