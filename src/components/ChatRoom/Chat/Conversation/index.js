import React, { Component } from 'react';
import Avatar from '../../../common/Avatar';
import img from '../../../../assets/images/46.jpg';
import Message from './Message';
import { connect } from 'react-redux';
import {
	messagesCollection,
	sendMessage
} from '../../../../store/actions/chatActions';

import './_Conversation.scss';

class Conversation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '',
			height: null,
			messages: [],
			activeChat: null
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.chatContainer = React.createRef();
	}

	componentDidMount() {
		if (this.props.activeChat === null) {
			return false;
		} else {
			this.props
				.messagesCollection(this.props.activeChat)
				.orderBy('time')
				.onSnapshot(snapshot => {
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
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.activeChat !== nextProps.activeChat) {
			return {
				...prevState,
				activeChat: nextProps.activeChat
			};
		}
		return null;
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.activeChat !== this.props.activeChat) {
			this.props
				.messagesCollection(this.props.activeChat)
				.orderBy('time')
				.onSnapshot(snapshot => {
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
	}

	scrollToMyRef() {
		const scroll =
			this.chatContainer.current.scrollHeight -
			this.chatContainer.current.clientHeight;
		this.chatContainer.current.scrollTo(0, scroll);
	}

	handleOnChange(e) {
		if (e.key === 'Enter') {
			this.handleOnSubmit();
		}
		this.setState({
			message: e.target.value
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
			this.props.sendMessage(this.state.activeChat, msg);

			this.setState(
				{
					...this.state,
					message: ''
				},
				() => this.scrollToMyRef()
			);
		}
	}

	render() {
		const { activeUser } = this.props;
		return (
			<div className="conversation">
				<div className="conversation__header">
					<Avatar src={img} large={true} />
					<div className="conversation__header__details">
						<span className="conversation__username">
							{activeUser.firstName}
						</span>
						<span className="conversation__user-detail">Account menager</span>
						<a href="#" className="close">
							<i className="fa fa-times" />
						</a>
					</div>
				</div>
				<div className="conversation__body" ref={this.chatContainer}>
					{this.state.messages.map((msg, i) => {
						return (
							<Message
								key={i + 1}
								text={msg.text}
								autor={msg.sender === this.props.user.email ? true : false}
								time={msg.time}
							/>
						);
					})}
					<span ref={this.chatBottom} />
				</div>
				<div className="conversation__form">
					<form className="message-form" onSubmit={this.handleOnSubmit}>
						<textarea
							className="message-input"
							onChange={this.handleOnChange}
							name="message"
							value={this.state.message}
							// ref={this.messageInput}
							placeholder="Type message..."
							// style={{ height: `${this.state.height}px` }}
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
	user: state.auth,
	chats: state.chats
});

const mapDispatchToProps = dispatch => ({
	messagesCollection: id => dispatch(messagesCollection(id)),
	sendMessage: (id, msg) => dispatch(sendMessage(id, msg))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Conversation);
