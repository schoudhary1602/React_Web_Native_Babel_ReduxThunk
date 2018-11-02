import React, { Component } from 'react';
import { Provider } from 'react-redux';
import LoginPage from '../containers/LoginPage/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div>
            <Switch>
              <Route path="/" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
