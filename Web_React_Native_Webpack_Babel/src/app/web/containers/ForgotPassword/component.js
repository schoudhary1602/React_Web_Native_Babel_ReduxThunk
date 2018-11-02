/**
 * LoginPage
 *
 * This is the page we show when the user visits login url
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Validator from '../../../utils/validations'
import { bindActionCreators } from 'redux'
import * as loginActions from '../../../actions/LoginAction'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify';


import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import Button from '@material-ui/core/Button';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import TextField from 'material-ui/TextField';

class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        console.log(" In forget password page");
        this.state = {
            email: "",
            message: "",
            open: false
        };
    }

    handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({ [name]: value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.forgetPassword) {
            this.setState({ message: nextProps.forgetPassword.message });
            this.setState({ email: "" });
            this.setState({ open: true });
        }
    }

    componentWillMount() {
        console.log('componentWillMount props loginResponse: ', this.props.loginResponse)
    }

    handleSubmit(event) {
        event.preventDefault()
        this.form.validateAll()
        if (!Validator.hasError(this.form)) {
            this.props.actions.forgotPassword({ email: this.state.email })
        }

    }

    render() {

        return (
            <div className="app flex-row align-items-center">
                <Helmet>
                    <title>Forgot Password</title>
                </Helmet>
                <MuiThemeProvider>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="8">

                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <h1>Forgot Password</h1>
                                            <p className="text-muted">Please enter you registered email Address. If email exists in our records, a Reset Password link will be sent to your email</p>
                                            <Form ref={c => { this.form = c }}>
                                                <InputGroup className="mb-4">

                                                    <TextField type="text" name="email" placeholder="Email" id="email" value={this.state.email} onChange={(e) => this.handleChange(e)} validations={[Validator.required, Validator.email]} />
                                                </InputGroup>
                                            </Form>
                                            <Row>
                                                <Col xs="6">
                                                    <Button variant="contained" color="primary" className="px-4" onClick={this.handleSubmit.bind(this)}>
                                                        Send Email
                                                </Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Link to="/login">
                                                        <Button id="loginBtn" color="link" className="px-0">
                                                            Login
                                                    </Button>
                                                    </Link>
                                                </Col>

                                                <Col xs="6" className="text-right">
                                                    <p id="" >{this.state.message}</p>


                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>
                </MuiThemeProvider>
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
                    message={<span id="message-id">{this.state.message}</span>}
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
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        forgotStatus: state.loginReducer.forgotStatus,
        forgetPassword: state.loginReducer.forgetPassword
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)