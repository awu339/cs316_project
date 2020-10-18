
import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import Home from './Home';
import Favorites from './Favorites';
import Movies from './Movies';
import Profile from './Profile';
import Search from './Search';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [userList, setUserList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getusers")
    .then((response) => {
      setUserList(response.data);
    }); 
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getmovies")
    .then((response) => {
      setMovieList(response.data);
    }); 
  }, []);

  const submitUser = () => {
    console.log('here2');
    Axios.post('http://localhost:3001/api/insert', {
      userID: userID, 
      username: username, 
      pwd: pwd, 
      type: type, 
      date: date
    }).then(() => {
      alert("success");
    });
  };

  return (
    <Router>
      <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/favorites" component={Favorites}/>
            <Route path="/movies" component={Movies}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/search" component={Search}/>
          </Switch>

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
      
            {userList.map((val) => {
              return (
              <p>
                Username: {val.username} |
                Date created: {val.date_created}
              </p>
              );
            })}

            {movieList.map((val) => {
              return (
              <p>
                Movie: {val.name} |
                Year: {val.year}
              </p>
              );
            })}
          </div>
        </div>
    </Router>

  );
}

export default App;
