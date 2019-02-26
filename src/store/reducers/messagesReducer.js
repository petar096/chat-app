const initState = {};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case GET_CHATS:
			return action.user;
		case GET_CHAT:
			return {};
		case SEND_MESSAGE:
			return {};
		case GET_MESSAGES:
			return {};
		default:
			return state;
	}
};

export default authReducer;
