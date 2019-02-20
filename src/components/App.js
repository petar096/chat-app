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
import Header from './layout/Header/Header';
import { setUser } from '../store/actions/authActions';
import Test from './auth/Test';

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
					<Header />
					<Switch>
						<PrivateRoute path="/" component={Home} exact />
						<PublicRoute path={SIGN_IN} component={Login} />
						<PublicRoute path={SIGN_UP} component={SignUp} />
						<PublicRoute
							path={PASSWORD_FORGET}
							component={ResetPassword}
							exact
						/>
						{/* <Route path="/test" component={Test} /> */}
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
