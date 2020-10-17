import React from 'react';
import './App.css';

class Favorites extends React.Component{
  constructor() {
    super();
  }
  render() {
    return (
      <div className="Favorites">
        <header className="Favorites-header">
          <h1> MovieDB </h1>
        </header>
        <p> My Favorites </p>
      {/* <button onclick = "goToHome()"> Go Home </button> */}
      </div>
    );
  }
  goToHome() {
    console.log('go to home');
}
}



export default Favorites;