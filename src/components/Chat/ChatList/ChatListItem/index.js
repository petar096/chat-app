import React from 'react';
import Avatar from '@common/Avatar';

import './_Chat-list-item.scss';
import Capitalize from '@helpers/Capitalize';

const ChatListItem = ({ data, onClick, img }) => {
	return (
		<React.Fragment>
			<a className="chat-list-item" onClick={onClick}>
				<Avatar src={img} alt="User picture" />
				<div className="chat-list-item__content">
					<div className="chat-details">
						{data.firstName
							? `${Capitalize(data.firstName)}  ${Capitalize(data.lastName)}`
							: Capitalize(data)}
					</div>
					<p className="last-message">
						i <i className="fa fa-heart" style={{ color: 'red' }} /> Firebase
					</p>
				</div>
			</a>
		</React.Fragment>
	);
};

export default ChatListItem;
