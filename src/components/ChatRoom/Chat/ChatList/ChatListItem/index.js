import React from 'react';
import img from '../../../../../assets/images/46.jpg';
import Avatar from '../../../../common/Avatar';

import './_Chat-list-item.scss';

const ChatListItem = props => {
	return (
		<React.Fragment>
			<a className="chat-list-item" onClick={props.onClick}>
				<Avatar src={img} alt="User picture" />
				<div className="chat-list-item__content">
					<div className="chat-details">
						{`${props.userData.firstName} ${props.userData.lastName}`}
						<span className="chat-details__time">3min</span>
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
