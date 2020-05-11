import React, { Component } from 'react';
import {Route, Switch } from "react-router-dom";
import Users from '../components/users/Users';
import Home from '../components/Home';
import UserEdit from '../components/users/UserEdit';

class Routerconfig extends Component {


    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/tai-khoan" component={Users}></Route>
                    <Route exact path="/sua-tai-khoan/:slug.:id.html" component={UserEdit}></Route>
                </Switch>
            </div>
        );
    }
}

export default Routerconfig;