const initState = {};
import { SIGN_IN, LOG_OUT, SET_USER } from '../types/authConstants';

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
