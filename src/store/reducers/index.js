import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import chatReducer from './chatReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	auth: authReducer,
	toastr: toastrReducer,
	isLoading: loadingReducer,
	form: formReducer,
	chats: chatReducer
});

export default rootReducer;
