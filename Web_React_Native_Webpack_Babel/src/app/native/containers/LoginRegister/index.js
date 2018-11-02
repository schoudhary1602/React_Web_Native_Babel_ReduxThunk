/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    StatusBar
} from 'react-native';

import Login from "../LoginRegister/Login";


class LoginHome extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#16a085",
            elevation: null
        },
        header: null
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#16a085" />
                <Login navigation={this.props.navigation} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
export default LoginHome;