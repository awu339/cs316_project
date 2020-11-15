import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
var friend_username = "";
var myfav = "";

function FriendPage(props) {
    const [favoritesList, setFavoritesList] = useState([]);
    const userid = localStorage.getItem('userid');


useEffect(() => {
    console.log("getting one movie");
    var userid = props.location.state[0].userid;
    friend_username = props.location.state[0].username;
    //friend_userid = userid;
    console.log(userid);
    Axios.get("http://localhost:3001/api/getfriendfav?id=" + userid)
    .then((response) => {
        setFavoritesList(response.data);
    })
   
}, []);

const addFavorite = (movieid) => {
    console.log('adding favorite');
    Axios.post(`http://localhost:3001/api/insertfriendfavorite`, {
        movieid: movieid,
        userid: userid
    })
    .then(() => alert('success'));
};
let unfavorite = (movieid, userid) => {
  console.log("movieid: " + movieid);
  Axios.get("http://localhost:3001/api/delete?id=" + movieid + "&userid=" + userid);
  //Axios.get('http://localhost:3001/api/delete', { id: movieid, userid: userid });
  console.log("userid" + userid);

};
let checkmyFav = (movieid, userid) => {
  myfav = "";
  Axios.get("http://localhost:3001/api/checkmyFav?id=" + movieid + "&userid=" + userid)
  .then((response) => {
    console.log("length " + response.data.length);
    if(response.data.length > 0){
      myfav = response.data[0].name;
      console.log("fav ");
      console.log(response.data[0].name);
      console.log(myfav); 
    }
    else{
        myfav = response.data;
        console.log("not fav ");
        console.log(response.data);
        console.log(myfav); 
    }
  });
  
  console.log("CHECKING myfav" + myfav);

}   
return (
  <div>
    <Nav/>
    <h1>{friend_username}'s Favorites</h1>
    {favoritesList.map((val) => {
    
    var watchval = "";
    if (val.watched == 1){
      var watchval = "Yes"
    }
    else{
      var watchval = "No"
    }

    checkmyFav(val.movieid, userid);
    console.log("this is my fav" + myfav);

    if(myfav === null || myfav.length === 0){
      return (
        <p>
          Movie: {val.name} |
          Year: {val.year} | 
          Synopsis: {val.synopsis} |
          Watched: {watchval}
          <br />
          <button onClick={() => {addFavorite(val.movieid)}}>Add Favorite</button>
         
       </p>
      );
    }
    else{
      return (
        <p>
          Movie: {val.name} |
          Year: {val.year} | 
          Synopsis: {val.synopsis} |
          Watched: {watchval}
          <br />
          
          <button onClick={() => {unfavorite(val.movieid, userid)}}> Unfavorite </button> 
       </p>
      );
    }
    
    
    })} 
  </div>
);
}

export default FriendPage;
