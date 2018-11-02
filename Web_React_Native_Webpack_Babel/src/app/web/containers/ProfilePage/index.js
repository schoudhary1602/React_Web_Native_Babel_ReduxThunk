import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Validator from '../../utils/validations'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ReactPasswordStrength from 'react-password-strength';
import './style.css'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


import * as loginActions from '../../actions/login'
import * as practice from '../../actions/practice'

class ProfilePage extends Component {
    constructor(props) {

        super(props)
        this.state = {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            org_name: "",
            org_website: "",
            phone_number: "",
            pms_id: "",
            sub_id: "",
            confirmPassword:""
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
        this.props.practiceAction.fetchPracticeList();
        let data = {
            subId: sessionStorage.getItem('subId')
        }
        this.props.actions.getUserProfileData(data);
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.profileData){
            console.log(nextProps.profileData);
            delete nextProps.profileData.password;
            this.setState(nextProps.profileData)
        }

        if(nextProps.passwordUpdateData){
            
           
        }

    }

    toggle() {
        console.log("data")
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    changeCallback = state =>
        this.setState({ passLength: state.password.length, password:state.password })

    changeValue(e) {
        this.setState({ value: e.currentTarget.textContent})
    }



    handleSubmit(event) {
        event.preventDefault();
        this.form.validateAll()
        if (!Validator.hasError(this.form)){
            this.props.actions.updateProfileData(
                {
                    email: this.state.email,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    org_name: this.state.org_name,
                    org_website: this.state.org_website,
                    phone_number: this.state.phone_number,
                    sub_id : this.state.sub_id
                }
            );
        }
    }

    handleSubmitPassword(event) {
        event.preventDefault();
        this.passwordForm.validateAll()
        if (!Validator.hasError(this.passwordForm)){
            this.props.actions.updateUserPassword(
                {
                    sub_id: sessionStorage.getItem('subId'),
                    newPassword: this.state.password,
                    oldPassword: this.state.currentPassword,
                }
            );
        }
    }


    render() {

        const { practiceListResponse, profileData } = this.props;
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
                    <title>Profile</title>
                </Helmet>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="12">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <h1>Profile</h1>
                                    {/*
                                    <Row>
                                        <Col className="labelStyle" md="6">
                                            1. Practice Management System
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Row>
                                                <Col md="4">
                                                    <InputGroup className="mb-4">
                                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                                            <DropdownToggle caret>
                                                                {this.state.value ? this.state.value : "Practice Management System"}
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownMenu>
                                                                    {
                                                                        practiceListData.map(data => {
                                                                            return (<DropdownItem id="pms" key={data.prac_id} onClick={this.changeValue.bind(this, data.prac_id, data.name)} onChange={(e) => this.handleChange(e)} name="pms" >{data.name}</DropdownItem>)
                                                                        })
                                                                    }
                                                                </DropdownMenu>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </InputGroup>
                                                </Col>
                                                <Col md="6">
                                                    {this.state.value && <Input id="pmsID" type="text" placeholder={`${this.state.value} ID`} />}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                                                */}
                                    <Form ref={c => { this.form = c }} >
                                    <Row>
                                        <Col className="labelStyle" md="6">
                                            1. Organization Details
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                       
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="text" placeholder="Organisation Name" name='org_name' id="orgName"
                                                    value={this.state.org_name} onChange={this.handleChange.bind(this)} validations={[Validator.required]}/>
                                            </InputGroup>
                                        </Col>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="text" placeholder="Website" name='org_website' id="orgWebsite"
                                                    value={this.state.org_website} onChange={this.handleChange.bind(this)} validations={[Validator.required, Validator.website]}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col className="labelStyle" md="6">
                                            2. Contact Information
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                       
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="text" placeholder="First Name" name='first_name' id="firstName"
                                                    value={this.state.first_name} onChange={this.handleChange.bind(this)} validations={[Validator.required]}/>
                                            </InputGroup>
                                        </Col>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="text" placeholder="Last Name" name='last_name' id="lastName"
                                                    value={this.state.last_name} onChange={this.handleChange.bind(this)} validations={[Validator.required]}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                       
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="text" placeholder="Phone Number" name='phone_number' id="phoneNumber"
                                                    value={this.state.phone_number} onChange={this.handleChange.bind(this)} validations={[Validator.required, Validator.mobile]}/>
                                            </InputGroup>
                                        </Col>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                       
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="email" placeholder="Email" name='email' id="email" readOnly
                                                    value={this.state.email} onChange={this.handleChange.bind(this)}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Button id="submitBtn" color="success" block onClick={this.handleSubmit.bind(this)}>Update Details</Button>
                                        </Col>
                                    </Row>
                                    </Form>
                                    <Form ref={c => { this.passwordForm = c }}>
                                    <Row>
                                        <Col className="labelStyle" md="6">
                                            3. Reset Password
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="password" onChange={this.handleChange.bind(this)}  placeholder="Current Password" id="currentPassword"
                                                 name="currentPassword" validations={[Validator.required]}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                    <ReactPasswordStrength
                                                        className="form-control"
                                                        ref={ref => this.ReactPasswordStrength = ref}
                                                        minLength={6}
                                                        inputProps={{ ...inputProps, id: 'inputPassword1' }}
                                                        changeCallback={this.changeCallback}
                                                   />
                                                </InputGroupAddon>                                                
                                            </InputGroup>
                                        </Col>
                                        <Col md="5">
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-lock"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="form-control" type="password" placeholder="Confirm Password" name='confirmPassword' id="password"
                                                     onChange={this.handleChange.bind(this)} validations={[Validator.required]}/>
                                            </InputGroup>
                                        </Col>
                                    </Row>                         
                                    <div>
                                        {(this.state.password != this.state.confirmPassword) ? <span style={{'marginTop':"-15px"}}className="validation-help-block">Password and Confirm Password does not match</span> : null}
                                    </div>
                                         
                                    <Row>
                                        <Col md="3">
                                            <Button style={{'marginTop':"25px"}} id="submitPasswordBtn" color="success" block onClick={this.handleSubmitPassword.bind(this)}>Update Password</Button>
                                        </Col>

                                         {/* <p style={{color: 'red' , paddingTop:'10px'}}>{this.props.passwordUpdateData && this.props.passwordUpdateData.message ? this.props.passwordUpdateData.message:""}</p> */}
                                    </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log('login new mapStateToProps', state);
    return {
        profileResponse: state.loginReducerHandler.loginResponse,
        practiceListResponse: state.practiceReducerHandler.practiceList,
        profileData: state.loginReducerHandler.profileData,
        passwordUpdateData : state.loginReducerHandler.passwordUpdate
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),
        practiceAction: bindActionCreators(practice, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)