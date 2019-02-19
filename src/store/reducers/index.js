import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	auth: authReducer,
	toastr: toastrReducer,
	form: formReducer
});

export default rootReducer;
