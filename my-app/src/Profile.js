import React from 'react';
import './App.css';

function Profile() {
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


export default Profile;