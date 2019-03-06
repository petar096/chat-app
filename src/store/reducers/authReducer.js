import { LOG_OUT, SET_USER } from '../types/authConstants';
const initState = {};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_USER:
			return action.user;
		case LOG_OUT:
			return {};
		default:
			return state;
	}
};

export default authReducer;
