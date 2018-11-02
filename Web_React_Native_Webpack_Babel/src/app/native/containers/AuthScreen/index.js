import React, { Component } from 'react'
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native'
import { Image, View } from 'react-native-animatable'

import imgLogo from '../../../images/splash.png'
import metrics from '../../../config/metrics'

import Opening from './Opening'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


/************************** Action ************************/
import * as AuthAction from '../../../actions/AuthAction';

/********************************************************/

/************************** Redux ************************/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
/********************************************************/

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

class AuthScreen extends Component {


  state = {
    visibleForm: null // Can be: null | SIGNUP | LOGIN
  }

  componentWillUpdate(nextProps) {
    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null)
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800)
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onLoginAnimationCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // 3. Set the new visible form
    this.setState({ visibleForm })
  }

  onLoginPress(email, password) {
    console.log(this.props);
    var payload = {
      userName: email,
      passowrd: password
    }
    this.props.AuthAction.doLogin(payload);
  }

  render() {
    const { isLoggedIn, isLoading, signup, login } = this.props
    const { visibleForm } = this.state
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }
    return (
      <View style={styles.container}>
        <Image
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={(ref) => this.logoImgRef = ref}
          style={styles.logoImg}
          source={imgLogo}
        />
        {(!visibleForm && !isLoggedIn) && (
          <Opening
            onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
        >
          {(visibleForm === 'SIGNUP') && (
            <SignupForm
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignupPress={signup}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'LOGIN') && (
            <LoginForm
              ref={(ref) => this.formRef = ref}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onLoginPress={(email, password) => this.onLoginPress(email, password)}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    )
  }


}
const mapStateToProps = state => {
  console.log('login new mapStateToProps', state);
  return {
    loginResponse: state.loginReducer.loginResponse,
    isLoggedIn: state.loginReducer.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    AuthAction: bindActionCreators(AuthAction, dispatch),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: '#1976D2'
  }
})
