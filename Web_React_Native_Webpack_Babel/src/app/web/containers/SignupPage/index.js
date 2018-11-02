import React, { Component } from 'react';
import {
    Card, CardBody, Col, Container,
    InputGroup, InputGroupAddon, InputGroupText, Row, Jumbotron
} from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPasswordStrength from 'react-password-strength';
import './style.css'
import { Link } from 'react-router-dom'
import _get from 'lodash/get'
import {
    AppFooter,
    AppHeader
} from '@coreui/react';
import { Helmet } from 'react-helmet'
import Validator from '../../../utils/validations'
import * as loginActions from '../../../actions/LoginAction';
import DefaultFooter from '../../components/DefaultFooter';
import LoginHeader from '../../components/LoginHeader';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Center from 'react-center';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';

class SignupPage extends Component {

    constructor(props) {
        super(props);
        console.log("This is Signup Page");
        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            dropdownOpen: false,
            value: '',
            pmsId: '',
            email: '',
            isValidated: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.form.validateAll()
        this.setState({ isValidated: true })
        console.log(this.form)
        if (this.state.password != this.state.confirmPassword) {
            return;
        }
        //  if (!Validator.hasError(this.form) && this.state.value.length > 0)
        {
            var data =
            {
                "email": this.state.email,
                "password": this.state.confirmPassword,
                "first_name": this.state.firstName,
                "last_name": this.state.lastName,
                "phone_number": this.state.contactNumber,
            };
            this.props.actions.doSignup(data);
        }



    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log(this.props.registerUserResponse, "registerUserResponse");
    }

    toggle() {
        // console.log("data")
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeCallback = state =>
        this.setState({
            passLength: state.password.length, password: state.password
        })

    changeValue(prac_id, prac_name) {
        //console.log(e.currentTarget)
        this.setState({ value: prac_name, pmsId: prac_id })
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

        };
        console.log(this.props.registerUserResponse, "Data");

        const { isUserRegistered, registerUserResponse } = this.props;
        console.log(this.props, "Props")

        console.log("**** Rendering Signup page *******");
        return (
            <div style={style.bg}>
                <Helmet>
                    <title>Sign Up</title>
                </Helmet>
                <AppHeader fixed>
                    <LoginHeader />
                </AppHeader>
                <div >
                    <Container>
                        <Row >
                            {isUserRegistered ?
                                (<div>
                                    <Jumbotron>
                                        <h1 >Congratulations!</h1>
                                        <p >{_get(registerUserResponse, 'message', '')}</p>
                                        <hr />
                                        <p>
                                            <Link className="btn btn-primary" id="loginBtn" to="/login">Login</Link>
                                        </p>
                                    </Jumbotron>
                                </div>)
                                :
                                (<Col >
                                    <Center>
                                        <MuiThemeProvider>
                                            <Card >
                                                <CardBody >
                                                    <h1>Register</h1>
                                                    <p >Create your account</p>

                                                    <Form ref={c => { this.form = c }} onSubmit={this.handleSubmit.bind(this)}>
                                                        <Row>
                                                            <Col md="5">
                                                                <InputGroup className="mb-4">
                                                                    <TextField type="text" onChange={(e) => this.handleChange(e)} name="firstName" placeholder="First Name" id="firstName" validations={[Validator.required]} />
                                                                </InputGroup>
                                                            </Col>

                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                            <Col md="5">
                                                                <InputGroup className="mb-4">

                                                                    <TextField type="text" onChange={(e) => this.handleChange(e)} name="lastName" placeholder="Last Name" id="lastName" validations={[Validator.required]} />
                                                                </InputGroup>
                                                            </Col>
                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col md="5">
                                                                <InputGroup className="mb-4">

                                                                    <TextField type="text" onChange={(e) => this.handleChange(e)} name="contactNumber" placeholder="Phone Number" id="phoneNumber" validations={[Validator.required, Validator.mobile]} />
                                                                </InputGroup>
                                                            </Col>
                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                            <Col md="5">
                                                                <InputGroup className="mb-4">
                                                                    <TextField type="email" onChange={(e) => this.handleChange(e)} name="email" placeholder="Email" id="email" validations={[Validator.required, Validator.email]} />
                                                                </InputGroup>
                                                            </Col>
                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col md="5">
                                                                <InputGroup className="mb-4">

                                                                    <InputGroup className="mb-4">
                                                                        <TextField type="password" onChange={(e) => this.handleChange(e)} name="password" placeholder="password" id="password" validations={[Validator.required, Validator.password]} />
                                                                    </InputGroup>


                                                                </InputGroup>

                                                                <div>
                                                                    {(this.state.password != this.state.confirmPassword) ? <span style={{ 'marginTop': "-25px" }} className="validation-help-block">Password and Confirm Password does not match</span> : null}
                                                                </div>
                                                            </Col>
                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                            <Col md="5">
                                                                <InputGroup className="mb-4">

                                                                    <TextField type="password" onChange={(e) => this.handleChange(e)} name="confirmPassword" placeholder="Confirm Password" id="password" validations={[Validator.required]} />
                                                                </InputGroup>
                                                            </Col>
                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col md="3">
                                                                <Button variant="contained" color="primary" id="createAccount" color="success" onClick={(event) => this.handleSubmit(event)} block>Create Account</Button>
                                                                <p>Already have an account ? <Link id="signIn" to="/login">SignIn</Link></p>
                                                                {!this.props.isUserRegistered && <p style={{ color: 'red', paddingTop: '10px' }}>{this.props.registerUserResponse && this.props.registerUserResponse.message ? this.props.registerUserResponse.message : ""}</p>}
                                                            </Col>
                                                            <Col md="5">
                                                                <p>        </p>
                                                            </Col>

                                                        </Row>
                                                    </Form>

                                                </CardBody>
                                            </Card>
                                        </MuiThemeProvider>
                                    </Center>
                                </Col>)
                            }
                        </Row>
                    </Container>
                </div>
                <AppFooter>
                    <DefaultFooter />
                </AppFooter>
            </div>
        );
    }
}





function mapStateToProps(state) {
    console.log('login new mapStateToProps', state);
    return {
        registerUserResponse: state.loginReducer.signupResponse,
        isUserRegistered: state.loginReducer.isSignupSuccess
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)