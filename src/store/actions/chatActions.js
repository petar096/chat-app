import { auth, app, db } from '../../firebase/config';
import { startLoading, finishLoading } from './loadingActions';
import { GET_CHATS } from '../types/chatConstants';

export const getChats = () => () => {
	// dispatch(startLoading());

	// db.collection('chats')
	// 	.get()
	// 	.then(chats => {
	// 		const conversations = [];
	// 		chats.docs.map(chat => {
	// 			conversations.push({ id: chat.id, ...chat.data() });
	// 		});

	// 		dispatch({
	// 			type: GET_CHATS,
	// 			chats: conversations
	// 		});
	// 	})
	// 	.catch(err => console.log(err));

	return db
		.collection('chats')
		.doc('7031u8BpaP3tJaamRGfD')
		.collection('messages')
		.get();
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
