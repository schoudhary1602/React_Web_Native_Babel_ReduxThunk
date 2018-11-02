import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../images/logo.png';
import sygnet from '../../images/hp3-short.png';
import userLogo from '../../images/6.jpg';
import '../../css/custom.css';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

    logoutUser() {
        sessionStorage.clear();
        window.location.href = "/login"
        //this.props.history.push('/login')
    }

    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppNavbarBrand
                    full={{ src: logo, width: 200, height: 55, alt: 'App Logo' }}
                    minimized={{ src: sygnet, width: 50, height: 55, alt: 'App Logo' }}
                />
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppSidebarToggler className="d-md-down-none" display="lg" />
                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink href="/app">Dashboard</NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <AppHeaderDropdown direction="down">
                        <DropdownToggle nav>
                            <img src={userLogo} className="img-avatar" alt="User" />
                        </DropdownToggle>
                        <DropdownMenu right style={{ right: 'auto' }}>
                            {/*<DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>*/}
                            <DropdownItem onClick={this.logoutUser.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                        </DropdownMenu>
                    </AppHeaderDropdown>
                </Nav>
            </React.Fragment>
        );
    }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
