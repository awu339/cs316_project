import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';

function Newuser() {
    const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getusers")
        .then((response) => {
          setUserList(response.data);
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
    <div>
      <Nav />
      <h1>Register new user</h1>
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
        </div>
    </div>

    
  );
}

export default Newuser;