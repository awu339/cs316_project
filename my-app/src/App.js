
import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import Home from './Home';
import Favorites from './Favorites';
import Movies from './Movies';
import Profile from './Profile';
import Search from './Search';
import Newuser from './Newuser';
import MoviePage from './MoviePage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {


  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/favorites" component={Favorites}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/search" component={Search}/>
            <Route path="/newuser" component={Newuser}/>
            <Route path="/moviepage" component={MoviePage}/>
          </Switch>
      </div>
    </Router>

  );
}

export default App;
