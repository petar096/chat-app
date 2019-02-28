import {
	GET_CHAT,
	GET_CHATS,
	GET_MESSAGES,
	SEND_MESSAGE
} from '../types/chatConstants';

const chatReducer = (state = [], action) => {
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

export default chatReducer;
