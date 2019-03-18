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
		this.renderMessages = this.renderMessages.bind(this);
	}

	componentDidMount() {
		// check if user has conversation with that user
		if (this.props.activeChat === null) {
			return false;
		} else {
			this.props
				.messagesCollection(this.props.activeChat.id)
				.orderBy('time')
				.onSnapshot(snapshot => {
					this.setState({ messages: [] });

					snapshot.forEach(doc => {
						// create new message populated with data from database
						const msg = { id: doc.id, ...doc.data() };
						// add each recieved message to state
						this.setState(
							{
								...this.state,
								messages: [...this.state.messages, msg]
							},
							() => {
								// croll chat container to last message
								this.scrollToMyRef();
							}
						);
					});
				});
		}
	}
	// listen for new active conversations
	static getDerivedStateFromProps(nextProps, prevState) {
		if (prevState.activeChat !== nextProps.activeChat) {
			return {
				...prevState,
				activeChat: nextProps.activeChat
			};
		}
		return null;
	}

	// check if user has new active conversation & re render new messages
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

	// scroll to bottom of the chat container
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

		const {
			getUserReference,
			setActiveConversation,
			sendMessage,
			clearSearchTerm,
			startConversation
		} = this.props;

		// check if nothing is written in textfield
		if (this.state.message === '') {
			return false;
		} else if (this.props.activeUser) {
			// create new message populated with providen data
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
			// send new message to already existing conversation
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

		// check if none of conversations is selected
		if (activeUser === null && activeChat === null) {
			return WellcomeSection;
			// if there is no existing conversation with user
			// but user is found and clicked in sidebar
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
			// if there is already conversation with selected user
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
