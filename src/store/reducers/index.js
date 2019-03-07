import { combineReducers } from 'redux';
import authReducer from '@reducers/authReducer';
import loadingReducer from '@reducers/loadingReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	auth: authReducer,
	toastr: toastrReducer,
	isLoading: loadingReducer,
	form: formReducer
});

export default rootReducer;
