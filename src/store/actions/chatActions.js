import { db } from '../../firebase/config';

export const getUserReference = id => {
	return db.collection('users').doc(id);
};

export const getChats = id => {
	const ref = getUserReference(id);
	return db.collection('chats').where('participants', 'array-contains', ref);
};

export const sendMessage = (id, msg) => {
	db.collection('chats')
		.doc(id)
		.collection('messages')
		.add({ sender: msg.sender, text: msg.text, time: msg.time });
};

export const messagesCollection = id => {
	return db
		.collection('chats')
		.doc(id)
		.collection('messages');
};

export const startConversation = (firstUser, secondUser) => {
	const obj = {
		participants: [firstUser, secondUser]
	};
	return db.collection('chats').add(obj);
};
export const createGroupChat = (groupName, ...participants) => {
	const groupChatObj = {
		groupName,
		participants
	};
	return db.collection('chats').add(groupChatObj);
};
