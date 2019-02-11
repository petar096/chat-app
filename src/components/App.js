import React, { Component } from 'react';
import SignUp from './SignUp/';
import Login from './Login/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ResetPassword from './ForgetPassword/ResetPassword';

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
