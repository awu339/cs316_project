import React from 'react';
import './App.css';

class Profile extends React.Component{
  constructor() {
    super();
  }
  render() {
    return (
      <div className="Profile">
        <header className="Profile-header">
          <h1> MovieDB </h1>
        </header>
        <p> My profile </p>
        <button onclick = "goToHome()"> Go Home </button>
      </div>
    );
  }
  goToHome() {
    console.log('go to home');
}
}



export default Profile;