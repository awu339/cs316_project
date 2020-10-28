import React from 'react';
import './App.css';
import Nav from './Nav';

function Home() {
  return (
    <div>
      <Nav/>
      <h1>Top trending movies 2020</h1>
      <img src = "titanic_movieposter.jpg" alt ="image"/>
      <h1>Recommended movies</h1>
    
    </div>
  );
}

export default Home;
