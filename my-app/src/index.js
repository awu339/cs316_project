import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Profile from './Profile';
import Favorites from './Favorites';
import {Navbar, Nav, NavLink} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, BrowserRouter } from 'react-router-dom';
import { Router, Switch, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>

    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);
