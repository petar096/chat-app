import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import './_ChatList.scss';
import SearchInput from '../../../common/SearchInput';
import { getChats } from '../../../../store/actions/chatActions';
import { connect } from 'react-redux';

const debounce = (fn, delay) => {
	let timer = null;
	return function(...args) {
		const context = this;
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
};

class ChatsList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
			chats: []
		};

		this.filterChats = this.filterChats.bind(this);
	}

	componentDidMount() {
		console.log(this.props);
		// this.props.getChats(this.props.user.email).then(c => console.log(c));

		this.props.getChats(this.props.user.email).onSnapshot(snapshot => {
			this.setState({ chats: [] });
			snapshot.forEach(doc => {
				console.log(doc);

				const chats = { id: doc.id, ...doc.data() };

				this.setState({
					...this.state,
					chats: [...this.state.chats, chats]
				});
			});
		});
	}

	filterChats(e) {
		this.setState(
			{
				searchTerm: e.target.value
			},
			() => {}
		);
	}

	render() {
		const { chats } = this.state;
		return (
			<div className="chats-list">
				<SearchInput large={true} onChange={this.filterChats} />
				{chats.map(({ id, participants }) => {
					return <ChatListItem key={id} participants={participants} />;
				})}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		user: state.auth
	};
};

const mapDispatchToProps = dispatch => ({
	getChats: email => dispatch(getChats(email))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatsList);
