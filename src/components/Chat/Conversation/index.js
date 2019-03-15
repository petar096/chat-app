import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	messagesCollection,
	sendMessage,
	startConversation
} from '@actions/chatActions';
import { getUserReference } from '@actions/authActions';
import './_Conversation.scss';
import bear from '@images/monster3.png';

import ChatHeader from './Header';
import ChatBody from './Body';
import ChatForm from './Form';

export const WellcomeSection = (
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
		const {
			getUserReference,
			setActiveConversation,
			sendMessage,
			clearSearchTerm,
			startConversation
		} = this.props;

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

			startConversation(
				getUserReference(this.props.user.id),
				getUserReference(this.props.activeUser.id)
			)
				.then(data => {
					setActiveConversation({
						id: data.id,
						otherUser: this.props.activeUser
					});
					return data.id;
				})
				.then(id => {
					sendMessage(id, msg);
					clearSearchTerm();
				});

			this.setState(
				{
					...this.state,
					message: ''
				},
				() => clearSearchTerm()
			);
		} else {
			const msg = {
				text: this.state.message,
				time: Date.now(),
				sender: this.props.user.email,
				avatar: this.props.user.avatar
			};
			sendMessage(this.state.activeChat.id, msg);
			this.setState(
				{
					...this.state,
					message: ''
				},
				() => {
					this.scrollToMyRef();
					clearSearchTerm();
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
					<ChatHeader
						activeUser={activeUser}
						clearState={this.props.clearState}
					/>
					<ChatBody />
					<ChatForm
						handleOnSubmit={this.handleOnSubmit}
						handleOnChange={this.handleOnChange}
						message={this.state.message}
					/>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<ChatHeader
						activeChat={activeChat}
						clearState={this.props.clearState}
					/>
					<ChatBody
						messages={this.state.messages}
						chatContainer={this.chatContainer}
						activeChat={this.props.activeChat}
						user={this.props.user}
					/>
					<ChatForm
						handleOnSubmit={this.handleOnSubmit}
						handleOnChange={this.handleOnChange}
						message={this.state.message}
					/>
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
