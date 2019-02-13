import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SIGN_UP, SIGN_IN, PASSWORD_FORGET } from '../constants/routes';
import { auth } from '../firebase/config';

import Home from './pages/Home';
import Login from './auth/Login/';
import ResetPassword from './auth/ForgetPassword/';
import SignUp from './auth/SignUp';
import NotFoundPage from './pages/NotFoundPage';
import { PrivateRoute } from '../routing/PrivateRoute';
import PublicRoute from '../routing/PublicRoute';
import Header from './layout/Header/Header';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authUser: {}
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged(authUser => {
			authUser
				? this.setState(() => ({ authUser }))
				: this.setState(() => ({ authUser: {} }));
		});
	}

	render() {
		return (
			<Router>
				<React.Fragment>
					<Header />
					<Switch>
						<Route path="/" component={Home} exact />
						<PublicRoute path={SIGN_IN} component={Login} />
						<PrivateRoute path={SIGN_UP} component={SignUp} />
						<Route path={PASSWORD_FORGET} component={ResetPassword} exact />
						<Route component={NotFoundPage} />
					</Switch>
				</React.Fragment>
			</Router>
		);
	}
}

export default App;
