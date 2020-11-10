//import React, { useState, Component } from 'react';
/* import App from './App';
import './App.css';
import { Button, Form, FormGroup, Label, Input }
    from 'reactstrap';
import { Redirect } from  'react-router-dom';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Home';


import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//import "./Login.css";

//class LoginPage extends Component {
function LoginPage(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  

  //render () {
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
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

export default LoginPage; */
//class LoginPage extends Component {

  /*   state = {
        redirect: false
      }
      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to= {{pathname: "/App"}} />
        }
    }
 */
    // constructor(props) {
    //   super(props);
    //   this.state = {value: ''};
    //   //this.handleInputChange = this.handleInputChange.bind(this);
    //   this.handleChange = this.handleChange.bind(this);
    //   this.handleSubmit = this.handleSubmit.bind(this);
    // }
  
    // handleChange(event) {
    //   /* this.setState({
    //     username: event.target.username,
    //     password: event.target.password
    //   }); */
    //   this.setState({u: event.target.value});
    //   //console.log({username});
    // }
  
    // handleSubmit(event) {
    //   alert('username ' + this.state.value);
    //   event.preventDefault();
    // }

/* 
    render () {
        return (
        
            <Form className = "login-form" onSubmit={this.handleSubmit}>
                <h1> 
                    <span className = "title">mymovielist.com</span>
                </h1>
                <h2 className = "text-center">Welcome</h2>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="username" value={this.state.value} onChange={this.handleChange} placeholder="username"/>
                  
                </FormGroup>
                <FormGroup> 
                    <Label>Password</Label>
                    <Input type="password" placeholder="password"/>
                </FormGroup>
                 <Button className = "btn" >Log in</Button> 
              
                </Form>
        );
    } */
//}

