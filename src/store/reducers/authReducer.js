const initState = null;
import { SIGN_IN, LOG_OUT } from '../types/authConstants';

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return action.user;
		case LOG_OUT:
			return null;
		default:
			return state;
	}
};

export default authReducer;
