import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import Axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctPassword, setCorrectPassword] = useState("");

  var x = "";
  function validateForm() {
    return username.length > 0 && password.length > 0;

  }



  function handleSubmit(event) {
    event.preventDefault();
    console.log("ohfssofhosfhsifds");
    alert('username ' + username + " password " + password);
    
    Axios.get("http://localhost:3001/api/checkuser?id=" + username)
    .then((response) => {
        console.log(response.data[0].password);
        x = response.data[0].password;
        setCorrectPassword(response.data[0].password);
        console.log(x);
        console.log(correctPassword);
      });  

      
    
  }
 
 

  return (
    <div className="Login">
        <h1>movielist.com</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}