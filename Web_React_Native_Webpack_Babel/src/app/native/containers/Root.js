import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Splash from './Splash'
import Navigator from '../router/Navigator'

export default class Root extends Component {
  render() {
    console.log('Inside Root view');
    console.log(this.props)
    return (
      <Provider store={this.props.store}>
        <Navigator />
      </Provider>

    );
  }
}



