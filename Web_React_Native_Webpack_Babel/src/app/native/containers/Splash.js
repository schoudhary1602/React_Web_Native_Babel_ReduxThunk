import React, { Component } from 'react';
export const IMAGENAME = require('../../images/splash.png');

import { Image } from 'react-native';
//import { LoginScreen } from '../../native/router/Navigator';


/** The app entry point */
class Splash extends Component {

  componentDidMount() {
    this.interval = setInterval(
      () => {
        clearInterval(this.interval);
        this.props.navigation.navigate('LoginHome');
      },
      500
    );
  }

  render() {
    return (<Image source={IMAGENAME} />);
  }
}

export default Splash;
