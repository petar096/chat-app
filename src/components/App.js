import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SIGN_UP, SIGN_IN, PASSWORD_FORGET } from '../constants/routes';

import Login from './auth/Login/';
import ResetPassword from './auth/ForgetPassword/';
import SignUp from './auth/SignUp';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authUser: null
		};
	}

	// componentDidMount() {
	// 	firebase.auth.onAuthStateChanged(authUser => {
	// 		authUser
	// 			? this.setState(() => ({ authUser }))
	// 			: this.setState(() => ({ authUser: null }));
	// 	});
	// }

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={SignUp} exact />
					<Route path={SIGN_IN} component={Login} exact />
					<Route path={PASSWORD_FORGET} component={ResetPassword} exact />
				</Switch>
			</Router>
		);
	}
}

export default App;
