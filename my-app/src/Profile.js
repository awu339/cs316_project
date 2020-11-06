import './App.css';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Profile() {
  const [profileInfo, setProfileInfo] = useState([]);
  

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getprofile")
    .then((response) => {
      setProfileInfo(response.data);
      //console.log(response.data);
    }); 
  }, []);  

  return (
    <div>
      <Nav/>
      <h1>Profile</h1>
      {profileInfo.map((val) => {
        return (
        <p>
          Userid: {val.userid} 
          <br />
          Username: {val.username} 
          <br />
          User type: {val.type} 
          <br />
          Date created: {val.date_created}
        </p>
        );
      })}
    </div>
  );
}

export default Profile;
