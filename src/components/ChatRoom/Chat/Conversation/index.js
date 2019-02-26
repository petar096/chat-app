import React, { Component } from 'react';
// import 'emoji-mart/css/emoji-mart.css';
// import { Picker } from 'emoji-mart';
import Avatar from '../../../common/Avatar';
import img from '../../../../assets/images/46.jpg';
import Message from './Message';

import './_Conversation.scss';

class Conversation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: null
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.messageInput = React.createRef();
	}

	handleOnChange(e) {
		const el = this.messageInput.current;
		this.setState({
			height: el.scrollHeight
		});
	}

	render() {
		return (
			<div className="conversation">
				<div className="conversation__header">
					<Avatar src={img} large={true} />
					<div className="conversation__header__details">
						<span className="conversation__username">John doe</span>
						<span className="conversation__user-detail">Account menager</span>
						<a href="#" className="close">
							<i className="fa fa-times" />
						</a>
					</div>
				</div>
				<div className="conversation__body">
					<Message text="dsadajsadshjdasdashjsdhjsdkjdkjasdkaskasdddaskjdasdasdhasdasdasdasdsdasdasdaskjas" />
					<Message text="dsadas" autor={true} />
				</div>
				<div className="conversation__form">
					<form className="message-form">
						<textarea
							className="message-input"
							onChange={this.handleOnChange}
							ref={this.messageInput}
							placeholder="Type message..."
							style={{ height: `${this.state.height}px` }}
						/>
						<div className="action-buttons-container">
							<button className="send-button" type="submit">
								<i className="fa fa-location-arrow" />
							</button>
							<a href="#0" className="input-actions">
								<i className="fa fa-film" />
							</a>
							<a href="#0" className="input-actions">
								<i className="fa fa-paperclip" />
							</a>
						</div>
					</form>
				</div>
			</div>
		);
	}
}
export default Conversation;
