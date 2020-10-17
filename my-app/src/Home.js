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
import {withRouter, Redirect} from 'react-router-dom';
import Favorites from './Favorites';


class Home extends React.Component{
  constructor() {
    super();
  }
  render() {
  return (
    
      <div className="Home">
        <header className="Home-header">
          <h1> MovieDB </h1>
           
        </header>
        <p> This is our project. </p>
        <p> List of movies goes here. </p>
        <Button variant="btn btn-success" onClick = {this.goToProfile} > My Profile </Button>
        <Button variant="btn btn-success" onClick = {() => this.goToFavorites('/Favorites')} > My Favorites </Button>
      
      </div>
    
  );
}

goToProfile() {
    console.log('clicked')
    return new Profile();
}
goToFavorites(){

 console.log('clicked')
  return <Redirect to="/Favorites" />
}
}
export default Home;
