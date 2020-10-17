import React from 'react';
import './App.css';
import Nav from './Nav';
import Home from './Home';
import Favorites from './Favorites';
import Movies from './Movies';
import Profile from './Profile';
import Search from './Search';
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
          </Switch>
      </div>
    </Router>
  );
}



export default App;
