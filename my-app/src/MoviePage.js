import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function MoviePage() {
    // console.log("test" + props.location.state);
    const [movieList, setMovieList] = useState([]);
    const [userid, setUserID] = useState('');
    const [movieid, setMovieID] = useState('');
    const [watched, setWatched] = useState('');

useEffect(() => {
  Axios.get("http://localhost:3001/api/getmovies")
  .then((response) => {
    setMovieList(response.data);
  }); 
}, []);

const addFavorite = (movieid) => {
    console.log("userid: " + userid);
    Axios.post("http://localhost:3001/api/insertfavorite/${movieid}").then(() => {
        alert("success");
    });
};


return (
  <div>
    <h1>Movie Page</h1>
    {movieList.map((val) => {
        if(val.movieid == 2) {
        return (
        <p id = "movieid">
          Movie: {val.name} |
          Year: {val.year}
        </p>
        );}
      })}
    <button onClick={addFavorite}>Add Favorite</button>
  </div>
);
}


export default MoviePage;
