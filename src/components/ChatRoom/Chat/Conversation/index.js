import React, { Component } from 'react';

class Conversation extends Component {
	render() {
		return (
			<div className="conversation">
				<div className="conversation__header">
					{/* Info about chat friend */}
				</div>
				<div className="conversation__body">{/* messages */}</div>
				<div className="conversation__form">{/* message editor */}</div>
			</div>
		);
	}
}
export default Conversation;
