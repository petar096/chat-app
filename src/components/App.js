import React, { Component } from 'react';
import SignUp from './SignUp/';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/" component={SignUp} exact />
					<Route path="/login" component={Login} exact />
				</Switch>
			</Router>
		);
	}
}

export default App;
