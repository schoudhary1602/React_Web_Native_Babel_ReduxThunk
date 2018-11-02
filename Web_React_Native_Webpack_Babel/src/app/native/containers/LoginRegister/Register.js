import React, { Component } from "react";
import Loader from "../../components/loader";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

/************************** Action ************************/
import * as LoginActions from '../../../actions/LoginAction';

/********************************************************/

/************************** Redux ************************/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
/********************************************************/

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      loading: false,
      message: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    }
  };



  componentWillReceiveProps(nextProps) {

    if (nextProps.loginFailed) {
      this.setState({
        loading: false
      });

    } else
      if (nextProps.isSignupSuccess) {
        this.setState({
          loading: false
        });
        this.props.navigation.goBack();
      } else {
        this.setState({
          loading: false,
          message: nextProps.signupResponse.message
        });
      }


  }

  async onRegisterPress() {
    const { email, password, name } = this.state;
    var dataToUpdate = {
      first_name: name,
      email: email,
      password: password
    };
    this.setState({
      loading: true
    });
    // await AsyncStorage.setItem("email", email);
    // await AsyncStorage.setItem("name", name);
    // await AsyncStorage.setItem("password", password);
    // this.props.navigation.navigate("Boiler");
    this.props.LoginActions.doSignup(dataToUpdate);
  }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("./banana.png")} />
          <Text style={styles.subtext}>{this.state.message}</Text>
        </View>
        <KeyboardAvoidingView>
          <TextInput
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.7)"
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />
          <TextInput
            value={this.state.password}
            onChangeText={password_confirmation => this.setState({ password_confirmation })}
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
        </KeyboardAvoidingView>
        <TouchableHighlight
          onPress={this.onRegisterPress.bind(this)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#16a085",
    padding: 20,
    paddingTop: 100
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
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  subtext: {
    color: "#ffffff",
    width: 160,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20
  }
});

const mapStateToProps = state => {
  console.log('login new mapStateToProps', state);
  return {
    signupResponse: state.loginReducer.signupResponse,
    isSignupSuccess: state.loginReducer.isSignupSuccess
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    LoginActions: bindActionCreators(LoginActions, dispatch),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Register);
