import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import CreatePassword from './components/Login/CreatePassword';
import Admin from './components/Admin/Admin';
import UserDashboard from './components/UserDashboard/UserDashboard';
import DesignSurvey from './components/DesignSurvey/DesignSurvey';

export default (
    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/password-reset' component={CreatePassword} />
        <Route path ='/admin' component={Admin} />
        <Route path='/dashboard' component={UserDashboard} />
        <Route path='/design-survey' component={DesignSurvey} />
    </Switch>
)