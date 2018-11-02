import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class HelloWorld extends Component {
  render() {
  
    const { onPress, color } = this.props;
    const style = StyleSheet.create({
      helloWorld: {
        color: color,
        textAlign: 'center',
      }
    });
    return (
      <View>
        <Text onPress={onPress} style={style.helloWorld}>Changed the component</Text>
      </View>
    );
  }
}

