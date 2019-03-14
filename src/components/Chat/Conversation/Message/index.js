import React from 'react';
import './_Message.scss';
import * as moment from 'moment';
import './_Message.scss';
import Avatar from '../../../common/Avatar';
import img from '@images/user.png';

const Message = ({ time, text, autor, avatar }) => {
	return (
		<React.Fragment>
			<div className={`message message--${autor ? 'autor' : 'participant'}`}>
				<p className="message-content">{text}</p>
				<span className={`message--${autor ? 'autor' : 'participant'}__time`}>
					{moment(time).calendar()}
				</span>
			</div>
			{!autor && avatar ? (
				<Avatar
					src={avatar ? avatar : img}
					size="xs"
					style={{ marginTop: '3rem' }}
				/>
			) : null}{' '}
		</React.Fragment>
	);
};

export default Message;
