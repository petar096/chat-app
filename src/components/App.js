import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SIGN_UP, SIGN_IN, PASSWORD_FORGET } from '../constants/routes';
import { connect } from 'react-redux';
import { auth } from '../firebase/config';

import Home from './pages/Home';
import Login from './auth/Login/';
import ResetPassword from './auth/ForgetPassword/';
import SignUp from './auth/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from '../routing/PrivateRoute';
import PublicRoute from '../routing/PublicRoute';
// import Header from './layout/Header/Header';
import Test from './pages/Test';
import { setUser } from '../store/actions/authActions';

class App extends Component {
	componentDidMount() {
		auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.props.setUser(authUser);
			}
		});
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<Switch>
						<PrivateRoute path="/" component={Home} exact />
						<PrivateRoute path="/test" component={Test} />
						<PublicRoute path={SIGN_IN} component={Login} />
						<PublicRoute path={SIGN_UP} component={SignUp} />
						<PublicRoute
							path={PASSWORD_FORGET}
							component={ResetPassword}
							exact
						/>
						<Route component={NotFoundPage} />
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

export default connect(
	null,
	{ setUser }
)(App);
