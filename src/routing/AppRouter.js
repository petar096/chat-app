import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	SIGN_UP,
	SIGN_IN,
	PASSWORD_FORGET,
	CHATROOM
} from '../constants/routes';

import Home from '@components/static/Home';
import Login from '@components/auth/Login/';
import ResetPassword from '@components/auth/ForgetPassword/';
import SignUp from '@components/auth/SignUp';
import NotFoundPage from '@components/static/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Test from '@components/static/Test';
import Chat from '@components/Chat';

const AppRouter = () => {
	return (
		<Router>
			<React.Fragment>
				<Switch>
					<PrivateRoute path="/" component={Home} exact />
					<PrivateRoute path="/test" component={Test} />
					<PublicRoute path={SIGN_IN} component={Login} />
					<PublicRoute path={SIGN_UP} component={SignUp} />
					<PublicRoute path={PASSWORD_FORGET} component={ResetPassword} exact />
					<PrivateRoute path={CHATROOM} component={Chat} />
					<Route component={NotFoundPage} />
				</Switch>
			</React.Fragment>
		</Router>
	);
};

export default AppRouter;
