/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import Root from './src/app/native/containers/Root';
import configureStore from './src/app/store/configureStore.prod.js';

const store = configureStore();

export default class App extends Component {
  render() {
    return (<Root store={store} />
    );
  }
}

