import React from 'react';
import './_Message.scss';
import * as moment from 'moment';
import './_Message.scss';

const Message = ({ time, text, autor }) => {
	return (
		<React.Fragment>
			<div className={`message message--${autor ? 'autor' : 'participant'}`}>
				<p>{text}</p>
				<span className={`message--${autor ? 'autor' : 'participant'}__time`}>
					{moment(time).calendar()}
				</span>
			</div>
		</React.Fragment>
	);
};

export default Message;
