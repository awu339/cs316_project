import React, { Component } from 'react';
import App from './App';
import './App.css';
import { Button, Form, FormGroup, Label, Input }
    from 'reactstrap';
import { Redirect } from  'react-router-dom';
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';
import Home from './Home';
class LoginPage extends Component {

    state = {
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


    render () {
        return (

            <Form className = "login-form">
                <h1> 
                    <span className = "title">my movie list.com</span>
                </h1>
                <h2 className = "text-center">Welcome</h2>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type="username" placeholder="username"/>
                </FormGroup>
                <FormGroup> 
                    <Label>Password</Label>
                    <Input type="password" placeholder="password"/>
                </FormGroup>
 {/*                <Button className = "btn" onClick = {this.setRedirect} >Log in</Button> */}
                <Link to = '/home'><Button className = "btn"> Login </Button></Link>
                </Form>
        );
    }
}

export default LoginPage;