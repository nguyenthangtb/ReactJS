import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import PostList from '../components/PostList';
import Product from '../components/Products';

class RouteURL extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={PostList} />
                    <Route path="/posts" component={Product}/>
                </Switch>
            </div>
        );
    }
}

export default RouteURL;