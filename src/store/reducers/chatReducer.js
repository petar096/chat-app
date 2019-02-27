import {
	GET_CHAT,
	GET_CHATS,
	GET_MESSAGES,
	SEND_MESSAGE
} from '../types/chatConstants';

const initialState = [
	{
		id: 1,
		participants: [
			{ id: 123, email: '123@gmail.com' },
			{ id: 456, email: '456@gmail.com' }
		],
		messages: [
			{ senderID: 123, text: 'some dummy text', time: 'asfdadsf' },
			{ senderID: 123, text: 'some dummy text', time: 'asfdadsf' },
			{ senderID: 456, text: 'some dummy text', time: 'asfdadsf' },
			{ senderID: 123, text: 'some dummy text', time: 'asfdadsf' }
		]
	},
	{
		id: 2,
		participants: [
			{ id: 123, email: '123@gmail.com' },
			{ id: 789, email: '789@gmail.com' }
		],
		messages: [
			{ senderID: 789, text: 'some dummy text', time: 'asfdadsf' },
			{ senderID: 123, text: 'some dummy text', time: 'asfdadsf' },
			{ senderID: 789, text: 'some dummy text', time: 'asfdadsf' },
			{ senderID: 789, text: 'some dummy text', time: 'asfdadsf' }
		]
	}
];

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CHATS:
			return action.chats;
		case GET_CHAT:
			return [];
		case SEND_MESSAGE:
			return state;
		case GET_MESSAGES:
			return state;
		default:
			return state;
	}
};

export default authReducer;
