import React, { Component } from 'react';
import Avatar from '@common/Avatar';
import img from '@images/46.jpg';
import Message from './Message';
import { connect } from 'react-redux';
import {
	messagesCollection,
	sendMessage,
	startConversation
} from '@actions/chatActions';
import { getUserReference } from '@actions/authActions';
import './_Conversation.scss';
import bear from '@images/monster3.png';
import userImage from '@images/46.jpg';
import groupImage from '@images/teamwork.png';

import Capitalize from '@helpers/Capitalize';

const WellcomeSection = (
	<div style={{ margin: 'auto', textAlign: 'center' }}>
		<img src={bear} style={{ maxHeight: '25rem', maxWidth: '30rem' }} />{' '}
		<h2 className="subheading">Welcome!! Start chating now.. </h2>
	</div>
);

class Conversation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: '',
			messages: []
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
		this.chatContainer = React.createRef();
		this.formC = React.createRef();
		this.renderMessages = this.renderMessages.bind(this);
	}

	componentDidMount() {
		if (this.props.activeChat === null) {
			return false;
		} else {
			this.props
				.messagesCollection(this.props.activeChat.id)
				.orderBy('time')
				.onSnapshot(snapshot => {
					this.setState({ messages: [] });
					snapshot.forEach(doc => {
						const msg = { id: doc.id, ...doc.data() };
						this.setState(
							{
								...this.state,
								messages: [...this.state.messages, msg]
							},
							() => {
								this.scrollToMyRef();
							}
						);
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
				.messagesCollection(this.props.activeChat.id)
				.orderBy('time')
				.onSnapshot(snapshot => {
					this.setState({ messages: [] });
					snapshot.forEach(doc => {
						const msg = { id: doc.id, ...doc.data() };
						this.setState({
							...this.state,
							messages: [...this.state.messages, msg]
						});
						this.scrollToMyRef();
					});
				});
		}
	}

	scrollToMyRef() {
		const scroll =
			this.chatContainer.current.scrollHeight -
			this.chatContainer.current.clientHeight;
		this.chatContainer.current.scrollTo(50, scroll);
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
		} else if (this.props.activeUser) {
			const msg = {
				text: this.state.message,
				time: Date.now(),
				sender: this.props.user.email,
				avatar: this.props.user.avatar
			};

			// creating new chat room if dont exist
			this.props
				.startConversation(
					this.props.getUserReference(this.props.user.id),
					this.props.getUserReference(this.props.activeUser.id)
				)
				.then(data => {
					this.props.setActiveConversation({
						id: data.id,
						otherUser: this.props.activeUser
					});
					return data.id;
				})
				.then(id => {
					this.props.sendMessage(id, msg);
					this.props.clearSearchTerm();
				});

			this.setState(
				{
					...this.state,
					message: ''
				},
				() => {
					this.props.clearSearchTerm();
				}
			);
		} else {
			const msg = {
				text: this.state.message,
				time: Date.now(),
				sender: this.props.user.email,
				avatar: this.props.user.avatar
			};
			this.props.sendMessage(this.state.activeChat.id, msg);
			this.setState(
				{
					...this.state,
					message: ''
				},
				() => {
					this.scrollToMyRef();
					this.props.clearSearchTerm();
				}
			);
		}
	}

	renderMessages() {
		const { activeUser, activeChat } = this.props;

		if (activeUser === null && activeChat === null) {
			return WellcomeSection;
		} else if (activeChat === null && activeUser) {
			return (
				<React.Fragment>
					<div className="conversation__header">
						<Avatar
							src={activeUser.avatar ? activeUser.avatar : img}
							large={true}
						/>
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
							<a className="close" onClick={this.props.clearState}>
								<i className="fa fa-times" />
							</a>
						</div>
					</div>
					<div className="conversation__body" ref={this.chatContainer}>
						{WellcomeSection}
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
					<div className="conversation__header">
						{activeChat.otherUser ? (
							<Avatar
								src={
									activeChat.otherUser.avatar
										? activeChat.otherUser.avatar
										: userImage
								}
								size="lg"
							/>
						) : (
							<Avatar
								src={activeChat.avatar ? activeChat.avatar : groupImage}
								size="lg"
							/>
						)}
						<div className="conversation__header__details">
							<span className="conversation__username">
								{activeChat.otherUser
									? `${Capitalize(
											activeChat.otherUser.firstName
									  )}  ${Capitalize(activeChat.otherUser.lastName)}`
									: activeChat.groupName}
							</span>
							<span className="conversation__user-detail">
								{' '}
								{activeChat.otherUser
									? 'Account menager'
									: `${activeChat.participants.length} participants`}
							</span>
							<a className="close" onClick={this.props.clearState}>
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
									avatar={this.props.activeChat.groupName ? msg.avatar : null}
									autor={msg.sender === this.props.user.email ? true : false}
									time={msg.time}
								/>
							);
						})}
					</div>
					<div className="conversation__form" ref="formC">
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
	loading: state.isLoading
});

const mapDispatchToProps = () => ({
	messagesCollection: id => messagesCollection(id),
	sendMessage: (id, msg) => sendMessage(id, msg),
	startConversation: (firstUser, secondUser) =>
		startConversation(firstUser, secondUser),
	getUserReference: id => getUserReference(id)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Conversation);
