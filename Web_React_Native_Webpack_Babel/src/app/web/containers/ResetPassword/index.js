import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPasswordStrength from 'react-password-strength';
import './style.css'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


import * as loginActions from '../../../actions/LoginAction'


class ResetPassword extends Component {
    constructor(props) {

        super(props)
        this.state = {
            password: "",
            confirm: ""
        }

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            dropdownOpen: false,
            value: ''
        };
    }
    handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({ [name]: value });
    }

    componentWillMount() {
        console.log(this.props.location.search);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.passUpdateSuccess) {
            this.props.history.push('/login')
        }
    }

    toggle() {
        console.log("data")
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeCallback = state =>
        this.setState({ passLength: state.password.length })

    changeValue(e) {
        this.setState({ value: e.currentTarget.textContent })
    }



    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password === this.state.confirm) {
            this.props.actions.updatePassword(
                {
                    password: this.state.password
                }
                , this.props.location.hash.replace(/%20/, "").replace("#/",""));
        }
    }

    render() {

        const { practiceListResponse, forgotStatus } = this.props;
        console.log(this.props, "Props")
        const practiceListData = practiceListResponse ? practiceListResponse : [];

        const inputProps = {
            placeholder: "Password",
            autoFocus: true,
            className: 'another-input-prop-class-name',
        };
        return (
            <div className="app flex-row align-items-center">
                <Helmet>
                    <title>Reset Password</title>
                </Helmet>
                <Container>
                    <Row className="justify-content-center">
                        {forgotStatus ?
                            (<div>
                                <Jumbotron>
                                    <h1 className="display-3">Congratulations!</h1>
                                    <p className="lead">{""}</p>
                                    <hr className="my-2" />
                                    <p className="lead">
                                        <Link className="btn btn-primary" id="loginBtn" to="/login">Login</Link>
                                    </p>
                                </Jumbotron>
                            </div>)
                            :
                            <Col md="12">
                                <Card className="mx-4">
                                    <CardBody className="p-4">
                                        <h1>Reset Password</h1>

                                        <Row>
                                            <Col md="5">
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="password" name="password" placeholder="New Password" id="newPassword" onChange={(e) => this.handleChange(e)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="5">
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-lock"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="password" name="confirm" placeholder="Confirm New Password" id="confirmPassword" onChange={(e) => this.handleChange(e)} />
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="3">
                                                <Button id="submitBtn" color="success" block onClick={this.handleSubmit.bind(this)}>Submit</Button>
                                            </Col>
                                        </Row>
                                        {!this.props.passUpdateSuccess && <p style={{ color: 'green', paddingTop: '10px' }}>{this.props.passUpdateData && this.props.passUpdateData.message ? this.props.passUpdateData.message : ""}</p>}
                                    </CardBody>
                                </Card>
                            </Col>
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log('login new mapStateToProps', state);
    return {

        passUpdateSuccess: state.loginReducer.updateSuccess,
        passUpdateData: state.loginReducer.updatePassword,
    }
}



function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)