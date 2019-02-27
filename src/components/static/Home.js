import React from 'react';
import { Link } from 'react-router-dom';
import { getUserById } from '../../store/actions/authActions';
import { getChats, sendMessage } from '../../store/actions/chatActions';
import { connect } from 'react-redux';

const Home = props => {
	const getUserById = function(id) {
		props
			.getUserById(id)
			.then(doc => console.log(doc.data()))
			.catch();
	};

	const getChats = function() {
		console.log(props.user.email);
		const msg = {
			text: 'dsadasasasd',
			time: Date.now(),
			sender: props.user.email
		};
		// props.sendMessage(msg);
		console.log('here');

		// props.getChats().then(doc => {
		// 	console.log(doc);
		// 	doc.forEach(d => {
		// 		console.log(d.id, d.data());
		// 	});
		// });
		props.sendMessage(msg);
		// props.getChats().then(chat => {
		// 	const values = chat.docs.map(doc => ({
		// 		id: doc.id,
		// 		messages: doc.messages,
		// 		...doc.data()
		// 	}));

		// 	console.log(values);
		// });
	};
	return (
		<React.Fragment>
			<h1>Home page</h1>
			<Link to="/signin">Login</Link>
			<button onClick={() => getUserById(props.user.id)}>Click</button>
			<button onClick={() => getChats()}>Click</button>
		</React.Fragment>
	);
};

const mapStateToProps = state => ({
	user: state.auth
});

export default connect(
	mapStateToProps,
	{ getUserById, getChats, sendMessage }
)(Home);
