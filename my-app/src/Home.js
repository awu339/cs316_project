import React from 'react';
import './App.css';
import Profile from './Profile';
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
    <div className="Home">
      <header className="Home-header">
        <h1> MovieDB </h1>
      </header>
      <p> This is our project. </p>
      <p> List of movies goes here. </p>
      <div className="movies">
      </div>
      <Button variant="btn btn-success" onClick = {this.goToProfile} > My Profile </Button>
    </div>
  );
}

goToProfile() {
    console.log('clicked')
    return new Profile();
}
}

export default Home;