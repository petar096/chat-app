import React, { Component } from 'react';
import Avatar from '../../../common/Avatar';
import img from '../../../../assets/images/46.jpg';
import Message from './Message';
import { connect } from 'react-redux';
import {
	messagesCollection,
	sendMessage,
	startConversation,
	getUserReference
} from '../../../../store/actions/chatActions';

import './_Conversation.scss';
import bear from '../../../../assets/images/bear.jpg';

class Conversation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '',
			messages: []
			// activeChat: null
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.chatContainer = React.createRef();
		this.renderMessages = this.renderMessages.bind(this);
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
		if (
			prevProps.activeChat !== this.props.activeChat &&
			this.props.activeChat !== null
		) {
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
		this.setState({
			message: e.target.value
		});
	}

	handleOnSubmit(e) {
		e.preventDefault();

		if (this.state.message === '') {
			return false;
		} else if (this.props.activeChat === null && this.props.activeUser) {
			const msg = {
				text: this.state.message,
				time: Date.now(),
				sender: this.props.user.email
			};

			// creating new chat room if dont exist
			this.props
				.startConversation(
					this.props.getUserReference(this.props.user.id),
					this.props.getUserReference(this.props.activeUser.id)
				)
				.then(data => {
					console.log(this.props.activeUser);
					this.props.setActiveConversation(this.props.activeUser, data.id);
					return data.id;
				})
				.then(id => {
					console.log(id);
					this.props.sendMessage(id, msg);
				});

			this.setState({
				...this.state,
				message: ''
			});
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

	renderMessages() {
		const { activeUser, activeChat } = this.props;

		if (activeUser === null && activeChat === null) {
			return (
				<div style={{ margin: 'auto' }}>
					<img src={bear} style={{ maxHeight: '30rem', maxWidth: '40rem' }} />{' '}
					<h2 className="subheading">Welcome!! Start chating now.. </h2>
				</div>
			);
		} else if (activeChat === null && activeUser) {
			return (
				<React.Fragment>
					<div className="conversation__header">
						<Avatar src={img} large={true} />
						<div className="conversation__header__details">
							<span className="conversation__username">
								{activeUser.firstName} {activeUser.lastName}
							</span>
							<span className="conversation__user-detail">Account menager</span>
							<a href="#" className="close">
								<i className="fa fa-times" />
							</a>
						</div>
					</div>
					<div className="conversation__body">
						<div style={{ margin: 'auto' }}>
							<img
								src={bear}
								style={{ maxHeight: '30rem', maxWidth: '40rem' }}
							/>{' '}
							<h2 className="subheading">Welcome!! Start chating now.. </h2>
						</div>
					</div>
					<div className="conversation__form">
						<form className="message-form" onSubmit={this.handleOnSubmit}>
							<input
								type="text"
								autoComplete="off"
								className="message-input"
								onChange={this.handleOnChange}
								name="message"
								value={this.state.message}
								placeholder="Type message..."
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
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<div className="conversation__header" ref={this.chatContainer}>
						<Avatar src={img} large={true} />
						<div className="conversation__header__details">
							<span className="conversation__username">
								{activeUser.firstName} {activeUser.lastName}
							</span>
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
									time={msg.time}
								/>
							);
						})}
					</div>
					<div className="conversation__form">
						<form className="message-form" onSubmit={this.handleOnSubmit}>
							<input
								type="text"
								autoComplete="off"
								className="message-input"
								onChange={this.handleOnChange}
								name="message"
								value={this.state.message}
								placeholder="Type message..."
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
				</React.Fragment>
			);
		}
	}

	render() {
		return <div className="conversation">{this.renderMessages()}</div>;
	}
}
const mapStateToProps = state => ({
	user: state.auth,
	chats: state.chats
});

const mapDispatchToProps = dispatch => ({
	messagesCollection: id => dispatch(messagesCollection(id)),
	sendMessage: (id, msg) => dispatch(sendMessage(id, msg)),
	startConversation: (firstUser, secondUser) =>
		startConversation(firstUser, secondUser),
	getUserReference: id => getUserReference(id)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Conversation);
