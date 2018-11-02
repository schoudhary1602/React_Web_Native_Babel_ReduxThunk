import React, { Component } from 'react';
import { Provider } from 'react-redux';



import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



import HomePage from './HomePage/index'
// import { ProfilePage } from '../App/web/containers/ProfilePage/index'
import ForgetPassword from '../containers/ForgotPassword/component'
import ResetPassword from './ResetPassword/index'
import SignupPage from './SignupPage/index'
import LoginPage from './LoginPage/index'

export default class Root extends Component {
  render() {
    console.log("Rendering webpage ")
    return (
      <Provider store={this.props.store} >
        <Router>
          <div>
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route path="/resetPassword" component={ResetPassword} />
              <Route path="/forgotPassword" component={ForgetPassword} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={LoginPage} />
            </Switch>
          </div>
        </Router>
      </Provider >
    );
  }
}

