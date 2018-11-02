import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';




import '../../css/custom.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class LoginHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>

        <Nav className="ml-auto" navbar>
          {/* <NavItem className="px-3">
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="/signup">SignUp</NavLink>
          </NavItem> */}
        </Nav>
      </React.Fragment>
    );
  }
}

LoginHeader.propTypes = propTypes;
LoginHeader.defaultProps = defaultProps;

export default LoginHeader;
