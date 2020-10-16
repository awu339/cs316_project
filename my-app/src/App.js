import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  const submitUser = () => {
    Axios.post('http://localhost:3001/api/insert', {
      userID: userID, 
      username: username, 
      pwd: pwd, 
      type: type, 
      date: date
    }).then(() => {
      alert("success");
    })
  };

  return (
    <div className="App">
      <h1>Make a new user</h1>

      <div className="form">
        <label>UserID:</label>
        <input 
          type="text" 
          name="userID" 
          onChange={(e)=> {
            setUserID(e.target.value)
          }} 
        />
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          onChange={(e)=> {
            setUsername(e.target.value)
          }} 
        />
        <label>Password:</label>
        <input 
          type="text" 
          name="pwd" 
          onChange={(e)=> {
            setPwd(e.target.value)
          }} 
        />
        <label>Type:</label>
        <input 
          type="text" 
          name="type" 
          onChange={(e)=> {
            setType(e.target.value)
          }} 
        />
        <label>Date:</label>
        <input 
          type="text" 
          name="date" 
          onChange={(e)=> {
            setDate(e.target.value)
          }} 
        />
        <button onClick = {submitUser}>Submit</button>
      
      </div>

    </div>
  );
}


export default App;
