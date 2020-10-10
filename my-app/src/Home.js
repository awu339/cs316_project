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
      <button onclick = "goToProfile()"> My Profile </button>
    </div>
  );
}

function goToProfile() {
    console.log('clicked')
    return Profile();
}

export default Home;