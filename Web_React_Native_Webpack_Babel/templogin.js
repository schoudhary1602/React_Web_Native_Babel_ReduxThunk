import React, { Component } from "react";
import Loader from "../../components/loader";

import {

  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";


/************************** Action ************************/
import * as LoginActions from '../../../actions/AuthAction';

/********************************************************/

/************************** Redux ************************/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
/********************************************************/


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: "",
      success: false,
      loading: false
    };
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.loginResponse) {
      this.setState({
        loading: false
      });

      console.log(nextProps.loginResponse);
      //delete nextProps.profileData.password;
      this.setState(nextProps.loginResponse)
    }

    if (nextProps.loginFailed) {
      this.setState({
        loading: false
      });

    }

  }


  onLoginPress() {

    this.setState({
      message: "",
      loading: false,
      success: false
    })


    const { email, password } = this.state;
    var payload = {
      email: email,
      password: password

    }
    console.log((email, password))
    console.log(this.props.LoginActions)
    if (this.props.LoginActions) {
      this.setState({
        loading: true
      });
      this.props.LoginActions.doLogin(payload);
    }
  }



  render() {

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("./banana.png")} />
            <Text style={styles.subtext}>{this.state.message}</Text>
          </View>
          <KeyboardAvoidingView style={styles.keyboard}>
            <View style={styles.window}>
              <TextInput style={styles.textInput}
                placeholder="Username"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
              />
            </View>
            <View style={styles.window}>
              <TextInput style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                secureTextEntry
                ref={input => (this.passwordInput = input)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("Register")}
            title="Sign up"
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("ForgetPassword")}
            title="Forget Password" >
            Forget Password
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16a085"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 150
  },
  subtext: {
    color: "#ffffff",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.8
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 15
  },
  window: {
    marginBottom: 15
  },

  textInput: {
    backgroundColor: 'rgba(1,1,1,0.4)', // 40% opaque
    color: 'white',
    height: 50,
    padding: 10
  }

});


const mapStateToProps = state => {
  console.log('login new mapStateToProps', state);
  return {
    loginResponse: state.loginReducer.loginResponse,
    isLoggedIn: state.loginReducer.isLoggedIn,
    loginFailed: state.loginReducer.loginFailed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Login);

