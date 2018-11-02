/**
 * LoginPage
 *
 * This is the page we show when the user visits login url
 */

import React, { Component } from 'react'
import Dashboard from './Dashboard'

import {

    Col,
    Container,
    Row
} from 'reactstrap';

class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    onBugerMenuIconClick() {
        this.sideDrawerMethodsRef.handleDrawerToggle();
    }



    render() {
        return (
            <Dashboard />

        )
    }
}


export default HomePage