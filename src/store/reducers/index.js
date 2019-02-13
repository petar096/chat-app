import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';

const rootReducer = combineReducers({
	auth: authReducer
});

export default rootReducer;

// import { composeWithDevTools } from 'redux-devtools-extension';

// import rootReducer from './reducers';

// const store = createStore(
// 	rootReducer,
// 	composeWithDevTools(applyMiddleware(thunk))
// );
