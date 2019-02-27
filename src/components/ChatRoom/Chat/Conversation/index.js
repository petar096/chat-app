import React, { Component } from 'react';
import Avatar from '../../../common/Avatar';
import img from '../../../../assets/images/46.jpg';
import Message from './Message';
import { connect } from 'react-redux';
import {
	messagesCollection,
	sendMessage,
	getChats
} from '../../../../store/actions/chatActions';

import './_Conversation.scss';

class Conversation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '',
			height: null,
			messages: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.renderMessages = this.renderMessages.bind(this);
		this.messageInput = React.createRef();
		this.chatBottom = React.createRef();
	}

	componentDidMount() {
		// change the ID from static

		this.props.getChats().then(doc => {
			doc.forEach(d => {
				this.setState({
					messages: [...this.state.messages, d.data()]
				});
			});
		});
		this.props.messagesCollection().onSnapshot(snapshot => {
			this.setState({ messages: [] });
			snapshot.forEach(doc => {
				const msg = { id: doc.id, ...doc.data() };

				this.setState({
					...this.state,
					messages: [...this.state.messages, msg]
				});
			});
		});
	}

	renderMessages() {
		this.state.messages.map((msg, i) => {
			console.log(msg);
		});
	}
	handleOnChange(e) {
		const el = this.messageInput.current;
		this.setState({
			message: e.target.value,
			height: el.scrollHeight
		});
	}

	handleOnSubmit(e) {
		e.preventDefault();

		if (this.state.messages === '') {
			return false;
		} else {
			const msg = {
				text: this.state.message,
				time: Date.now(),
				sender: this.props.user.email
			};
			this.props.sendMessage(msg);

			this.setState({
				...this.state,
				message: ''
			});

			this.chatBottom.scrollIntoView({ behavior: 'smooth' });
		}
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
					{this.state.messages.map((msg, i) => {
						return (
							<Message
								key={i + 1}
								text={msg.text}
								autor={msg.sender === this.props.user.email ? true : false}
								// time={msg.time}
							/>
						);
					})}
				</div>
				<span ref={this.chatBottom} />
				<div className="conversation__form">
					<form className="message-form" onSubmit={this.handleOnSubmit}>
						<textarea
							className="message-input"
							onChange={this.handleOnChange}
							name="message"
							value={this.state.message}
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
const mapStateToProps = state => ({
	user: state.auth
});

const mapDispatchToProps = dispatch => ({
	messagesCollection: () => dispatch(messagesCollection()),
	sendMessage: msg => dispatch(sendMessage(msg)),
	getChats: () => dispatch(getChats())
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Conversation);
