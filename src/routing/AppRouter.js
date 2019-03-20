import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	SIGN_UP,
	SIGN_IN,
	PASSWORD_FORGET,
	CHATROOM,
	MY_PROFILE
} from '../constants/routes';

import Home from '@components/static/Home';
import Login from '@components/auth/Login/';
import ResetPassword from '@components/auth/ForgetPassword/';
import SignUp from '@components/auth/SignUp';
import NotFoundPage from '@components/static/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Chat from '@components/Chat';
import ProfilePage from '../components/ProfilePage';

const AppRouter = () => {
	return (
		<Router>
			<React.Fragment>
				<Switch>
					<PrivateRoute path="/" component={Home} exact />
					<PublicRoute path={SIGN_IN} component={Login} />
					<PublicRoute path={SIGN_UP} component={SignUp} />
					<PublicRoute path={PASSWORD_FORGET} component={ResetPassword} exact />
					<PrivateRoute path={CHATROOM} component={Chat} />
					<PrivateRoute path={MY_PROFILE} component={ProfilePage} />
					<Route component={NotFoundPage} />
				</Switch>
			</React.Fragment>
		</Router>
	);
};

export default AppRouter;
