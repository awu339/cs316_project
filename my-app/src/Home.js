import React from 'react';
import './App.css';
import Profile from './Profile.js';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1> MovieDB </h1>
      </header>
      <p> This is our project. </p>
      <p> List of movies goes here. </p>
      <button onClick = {goToProfile}> My Profile </button>
      <button onClick = {link}> test </button>
    </div>
  );
}

function goToProfile() {
    console.log('clicked')
    return Profile();
}

function link() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
    }
    console.log('here')

    return (
        <button onClick={handleClick}>
        Click me
        </button>
    );
}

export default Home;