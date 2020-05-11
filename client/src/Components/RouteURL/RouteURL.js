import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Home from '../Home/Home';
import Products from '../Products/Products';
import Edit from '../Products/Edit';

class RouteURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={Products}/>
                    <Route path="/edit" component={Edit}/>
                </Switch>
            </div>
        );
    }
};

export default RouteURL;