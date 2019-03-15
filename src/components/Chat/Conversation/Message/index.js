import React from 'react';
import './_Message.scss';
import * as moment from 'moment';
import './_Message.scss';
import Avatar from '../../../common/Avatar';
import img from '@images/user.png';

const Message = ({ time, text, autor, avatar }) => {
	return (
		<div className="message-container">
			{!autor && avatar ? (
				<Avatar
					src={avatar ? avatar : img}
					size="xs"
					style={{ marginTop: '3rem', marginLeft: '2rem' }}
				/>
			) : null}
			<div className={`message message--${autor ? 'autor' : 'participant'}`}>
				<p className="message-content">{text}</p>
				<span className={`message--${autor ? 'autor' : 'participant'}__time`}>
					{moment(time).calendar()}
				</span>
			</div>
		</div>
	);
};

export default Message;
