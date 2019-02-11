import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './auth/Login/';
import ResetPassword from './auth/ForgetPassword/';

import SignUp from './auth/SignUp';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={SignUp} exact />
					<Route path="/login" component={Login} exact />
					<Route path="/forgot-password" component={ResetPassword} exact />
				</Switch>
			</Router>
		);
	}
}

export default App;
