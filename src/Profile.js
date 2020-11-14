import './App.css';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
//var userid = localStorage.getItem('userid');

function Profile() {
  const [profileInfo, setProfileInfo] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getprofile?id=" + userid)
    .then((response) => {
      setProfileInfo(response.data);
      //console.log(response.data);
    }); 
  }, []);  

  useEffect(() => {
    Axios.get("http://localhost:3001/api/myreviews?id=" + userid)
    .then((response) => {
      setMyReviews(response.data);
      console.log("reviews");
      console.log(response.data);
    }); 
  }, []);  

  return (
    <div>
      <Nav/>
      <h1>Profile</h1>
      {profileInfo.map((val) => {
        return (
        <p>
          Username: {val.username} 
          <br />
          User type: {val.type} 
          <br />
          Date created: {val.date_created}
        </p>
        );
      })}
    <h1> My Reviews </h1>
      {myReviews.map((val) => {
        return (
        <p>
          Movie: {val.name} | 
          Rating: {val.rating} | 
          Review #: {val.reviewid} | 
          <Link to={{ pathname: "/MoviePage", 
                state: [{movieid: val.movieid}]  
                }}> show
         </Link>
        </p>
        );
      })}
    </div>
  );
}

export default Profile;
