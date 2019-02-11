import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './SignUp/';
import Login from './Login/';
import ResetPassword from './ForgetPassword/';

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
