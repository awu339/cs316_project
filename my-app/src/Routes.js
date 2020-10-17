import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import Profile from "./Profile";
import Favorites from "./Favorites";


export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Profile" component={Profile} />
                    <Route path="/Favorites" component={Favorites} />
                </Switch>
            </Router>
        )
    }
}