/**
 * LoginPage
 *
 * This is the page we show when the user visits login url
 */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TextField from 'material-ui/TextField';

import React, { Component } from 'react';
import {
  Row
} from 'reactstrap';

import Center from 'react-center';


import Button from '@material-ui/core/Button';
import '../../css/custom.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import * as loginActions from '../../../actions/LoginAction'

class LoginPage extends Component {



  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      statusMessage: "",
      open: true
    };
  }
  componentWillMount() {
    console.log('componentWillMount props loginResponse: ', this.props.loginResponse)
  }



  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };


  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email != undefined && this.state.email != "" && this.state.password != undefined && this.state.password != "")
      this.props.actions.doLogin({ email: this.state.email, password: this.state.password });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      this.props.history.push('/home')
    } else
      if (nextProps.loginResponse) {
        this.setState({ statusMessage: nextProps.loginResponse.message });
        this.setState({ open: !this.props.isLoggedIn });
      }
  }


  handleChange(event) {

    const target = event.target

    const value = target.type === 'checkbox' ? target.checked : target.value

    const name = target.name

    this.setState({ [name]: value });

  }



  render() {
    const style =
    {
      margin: 15,
      bg: {
        backgroundColor: '#fafafa',
        height: '100vh'
      },
      inner: {

        marginTop: '15%',
        padding: "20px"
      },
      close: {
        padding: 10,
      },

    };

    console.log('************ Rendering login **********************')
    let { loginResponse, isLoggedIn } = this.props;
    console.log('render props loginResponse: ', loginResponse, isLoggedIn)
    return (
      <div style={style.bg}>
        <Center>
          <MuiThemeProvider>

            <div style={style.inner}>
              <TextField
                name="email"
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <TextField
                name="password"
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(e) => this.handleChange(e)}
              />
              <br />
              <Row>
                <Button variant="contained" color="primary" style={style} onClick={(event) => this.handleSubmit(event)} >
                  Login
                </Button>
                <Link to="/signup" style={{ textDecoration: 'none' }} >
                  <Button variant="contained" color="secondary" style={style} >
                    Register
                </Button>
                </Link>
              </Row>
              <Row>
                <Link to="/forgotPassword">
                  <Button style={style}  >
                    Forgot password
                </Button>
                </Link>
              </Row>
            </div>

          </MuiThemeProvider>
        </Center>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          variant="error"
          open={this.state.open}
          autoHideDuration={12000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.statusMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div >
    );
  }
}


function mapStateToProps(state) {
  console.log('login new mapStateToProps', state);
  return {
    loginResponse: state.loginReducer.loginResponse,
    isLoggedIn: state.loginReducer.isLoggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)