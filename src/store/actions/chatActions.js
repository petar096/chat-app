import { auth, app, db } from '../../firebase/config';
import { startLoading, finishLoading } from './loadingActions';
import { GET_CHATS } from '../types/chatConstants';

export const getMessages = () => {
	// dispatch(startLoading());
	return db
		.collection('chats')
		.doc('7031u8BpaP3tJaamRGfD')
		.collection('messages')
		.get();
};

export const getUserReference = id => {
	return db.collection('users').doc(id);
};

export const getChats = id => {
	return () => {
		const ref = getUserReference(id);
		return db.collection('chats').where('participants', 'array-contains', ref);
	};
};

export const getChatCollection = () => () => {
	return db.collection('chats').get();
};

export const sendMessage = (id, msg) => () => {
	db.collection('chats')
		.doc(id)
		.collection('messages')
		.add({ sender: msg.sender, text: msg.text, time: msg.time });
};

export const messagesCollection = id => () => {
	console.log(id);
	return db
		.collection('chats')
		.doc(id)
		.collection('messages');
};

export const startConversation = (firstUser, secondUser) => {
	const obj = {
		participants: [firstUser, secondUser]
	};
	db.collection('chats').add(obj);
};
