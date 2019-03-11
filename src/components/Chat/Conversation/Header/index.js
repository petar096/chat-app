import React from 'react';
import Avatar from '@common/Avatar';

import Capitalize from '@helpers/Capitalize';

const ConversationHeader = ({ activeUser, clearState, img }) => {
	return (
		<div className="conversation__header">
			<Avatar src={img} large={true} />
			<div className="conversation__header__details">
				<span className="conversation__username">
					{activeUser.firstName !== undefined
						? Capitalize(activeUser.firstName)
						: 'Google'}{' '}
					{activeUser.lastName !== undefined
						? Capitalize(activeUser.lastName)
						: 'User'}
				</span>
				<span className="conversation__user-detail">Account menager</span>
				<a className="close" onClick={clearState}>
					<i className="fa fa-times" />
				</a>
			</div>
		</div>
	);
};
export default ConversationHeader;
