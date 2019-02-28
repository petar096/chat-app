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

export const getChats = email => {
	return () => {
		console.log(email);
		return db
			.collection('chats')
			.where('participants', 'array-contains', email);
	};
};
export const getChatCollection = () => () => {
	return db.collection('chats').get();
};

export const sendMessage = msg => () => {
	db.collection('chats')
		.doc('7031u8BpaP3tJaamRGfD')
		.collection('messages')
		.add({ sender: msg.sender, text: msg.text, time: msg.time });
};

export const messagesCollection = () => () => {
	return db
		.collection('chats')
		.doc('7031u8BpaP3tJaamRGfD')
		.collection('messages');
};
