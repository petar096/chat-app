import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import thunk from 'redux-thunk';

import './styles/main.scss';

import App from './components/App';

import rootReducer from './store/reducers';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<ReduxToastr
			timeOut={4000}
			newestOnTop={true}
			preventDuplicates
			position="top-center"
			transitionIn="fadeIn"
			transitionOut="fadeOut"
			closeOnToastrClick
		/>
		<App />
	</Provider>,
	document.getElementById('root')
);
