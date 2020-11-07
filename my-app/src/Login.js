import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import Axios from 'axios';
import { Link } from 'react-router-dom';
var current_userid = "";

//localStorage.setItem('Userid',current_userid);

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [correctPassword, setCorrectPassword] = useState("");
  var correctPassword = "";
 
  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("ohfssofhosfhsifds");
    //alert('username ' + username + " password " + password);
    console.log(password);
    
    Axios.get("http://localhost:3001/api/checkuser?id=" + username)
    .then((response) => {

        if(response.data.length == 0) {
            alert("Username does not exist. Please try again");
        }
        else{
            correctPassword = response.data[0].password;
            console.log(correctPassword);
            console.log(password===correctPassword);
            checkPassword();
        }    
      });        
    }

    function checkPassword() {
        if (password === correctPassword){
            console.log("correct password"); 
            Axios.get("http://localhost:3001/api/getuserid?id=" + username)
            .then((response) => {
                console.log("pls get this data");
                console.log(response.data[0].userid);
                current_userid = response.data[0].userid;
                console.log(current_userid);
                localStorage.setItem('userid', current_userid);
                console.log('userid');

            });
            window.location.href = "http://localhost:3000/home";
        }
        else{
            console.log("WRONG!");
            alert('Wrong Password. Please try again.');
        }
    }; 

    /* function createItem() {
      localStorage.setItem("id", current_userid);
    } */

    
 
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
        <Link to = '/newuser'><Button block bsSize="large" className = "btn"> Register </Button></Link>
      </form>
    </div>
  );
}
