import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
var friend_username = "";
var userid = "";
var userfavlist = [];
var arr = [1];

function FriendPage(props) {
    const[friendexists, setFriendExists] = useState([]);
    const [favoritesList, setFavoritesList] = useState([]);
    const [reviewsListLimit, setReviewsListLimit] = useState([]);
    const userid1 = localStorage.getItem('userid');

useEffect(() => {
    console.log("getting one movie");
    userid = props.location.state[0].userid;
    friend_username = props.location.state[0].username;
    console.log(userid);
    Axios.get("http://localhost:3001/api/getfriendfav?id=" + userid)
    .then((response) => {
        setFavoritesList(response.data);
    })

    Axios.get("http://localhost:3001/api/getfriendreviewslimit?id=" + userid)
    .then((response) => {
        setReviewsListLimit(response.data);
    })
    Axios.post("http://localhost:3001/api/friendexists?id=", {
      user1: userid1,
      user2: userid})
    .then((response) => {
      setFriendExists(response.data);
    })
}, []);

const addFavorite = (movieid, userid1) => {
    console.log('adding favorite');
    Axios.post(`http://localhost:3001/api/insertfriendfavorite`, {
        movieid: movieid,
        userid: userid1
    })
    .then(() => alert('success'));
    window.location.href = "/FriendPage";
};

let unfriend = (userid) => {
  Axios.get("http://localhost:3001/api/unfriend?id=" + userid1 + "&userid=" + userid);
  window.location.href = "/FriendPage";
};

let addfriend = (userid) => {
  Axios.get("http://localhost:3001/api/addfriend?id=" + userid1 + "&userid=" + userid);
  window.location.href = "/FriendPage";
};

let getuserfav = (userid1, movieid) => {
  console.log('checking if movie in favs');
  Axios.post("http://localhost:3001/api/getuserfav", {
      movieid: movieid,
      userid: userid1
  })
  .then((response) => {
    console.log("is data here?");
    console.log(response.data);
    userfavlist = response.data;
  });
};

let unfavorite = (movieid, userid1) => {
  Axios.get("http://localhost:3001/api/delete?id=" + movieid + "&userid=" + userid1);
  //Axios.get('http://localhost:3001/api/delete', { id: movieid, userid: userid });

};

return (
  <div>
    <Nav/>
    <h1>{friend_username}'s Profile</h1>
    
    <h2>{friend_username}'s Favorite Movies</h2>
    {favoritesList.map((val) => {
    
    getuserfav(userid1, val.movieid);

    var watchval = "";
    if (val.watched == 1){
      var watchval = "Yes"
    }
    else{
      var watchval = "No"
    }

    console.log("what about here? ");
    console.log(userfavlist);
    if (userfavlist === undefined || userfavlist.length === 0) {
      return (
        <p>
          Movie: {val.name} |
          Year: {val.year} | 
          Synopsis: {val.synopsis} |
          Watched: {watchval}
          <br />
          <Button outline color="primary" className="w-25" onClick={() => {addFavorite(val.movieid)}}> Add Favorite </Button>
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
          <Button outline color="primary" className="w-25" onClick={() => {unfavorite(val.movieid, userid1)}}> Unfavorite </Button>
       </p>
      ); 
    }
    })} 

    <h2>{friend_username}'s Top 10 Ratings</h2>
    {reviewsListLimit.map((val) => {
      return (
        <p>
          Movie: <Link to={{ 
                pathname: "/MoviePage", 
                state: [{userid: userid1, movieid: val.movieid}]  
                }}> {val.name}</Link> |
          Rating: {val.rating} | 
          Date Reviewed: {val.date} 
          <br/> Review: {val.content}
      </p>
      );
    })}

    {arr.map(() => {
      if(friendexists === undefined || friendexists.length === 0){
        return(
          <p>
          <br/> <Button outline color="primary" className="w-25" onClick={() => addfriend(userid)}>Add Friend</Button>
          </p>
        )
      }
      else{
        return(
          <p>
          <br/> <Button outline color="primary" className="w-25" onClick={() => unfriend(userid)}>Remove Friend</Button>
          </p>
        )
      }

    }

    )}
  </div>

);


}

export default FriendPage;
