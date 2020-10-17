import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Profile from './Profile';
import Favorites from './Favorites';
import * as serviceWorker from './serviceWorker';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
  <Navbar bg="dark" varient="light">
  <Nav.Item>
    <BrowserRouter>
    <Link to="/">Home</Link>
    </BrowserRouter>
  
  </Nav.Item>
  <Nav.Item>
    <BrowserRouter>
    <Link to="/Profile">Profile</Link>
    </BrowserRouter>
    
  </Nav.Item>
  <Nav.Item>
    <NavLink activeClassName="active" to="/Favorites">Favorites</NavLink>
  </Nav.Item>
  </Navbar>

    <Home />
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
