import React from 'react';
import './App.css';
import Profile from './Profile.js';
import history from './history.js';
import { Button } from 'react-bootstrap';
import {
  Route,
  NavLink, 
  HashRouter
} from "react-dom";



class Home extends React.Component{
  constructor() {
    super();
  }
  render() {
  return (
    <HashRouter>
      <div className="Home">
        <header className="Home-header">
          <h1> MovieDB </h1>
           
        </header>
        <p> This is our project. </p>
        <p> List of movies goes here. </p>
        <Button variant="btn btn-success" onClick = {this.goToProfile} > My Profile </Button>
      </div>
    </HashRouter>
  );
}

goToProfile() {
    console.log('clicked')
    return new Profile();
}

}
export default Home;
