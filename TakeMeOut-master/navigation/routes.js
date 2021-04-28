import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from '../components/login.js';
import Create_account from '../components/create_account.js';
import Home_screen from '../navigation/home_screen.js';

const Routes = () => (
    <Router>
        <Scene key="root" hideNavBar={true}>
            <Scene key="login" component={Login} title="Home" initial={true} />
            <Scene key="signup" component={Create_account} title="About" />
            <Scene key="home" component={Home_screen} title="Home_screen" />
        </Scene>
    </Router>
)
export default Routes