import React from 'react';
import './_Message.scss';

const Message = ({ time, text, autor }) => {
	return (
		<div className={`message message--${autor ? 'autor' : 'participant'}`}>
			<p>{text}</p>
			<span>{time}</span>
		</div>
	);
};

export default Message;
