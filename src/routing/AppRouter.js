import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SIGN_UP, SIGN_IN, PASSWORD_FORGET } from '../constants/routes';

import Login from './auth/Login/';
import ResetPassword from './auth/ForgetPassword/';
import SignUp from './auth/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import { PublicRoute } from './PublicRoute';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" component={SignUp} exact />
				<PublicRoute path={SIGN_IN} component={Login} exact />
				<Route path={PASSWORD_FORGET} component={ResetPassword} exact />
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

export default App;
