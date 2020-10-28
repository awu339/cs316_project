import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function MoviePage(props) {
    const [movieList, setMovieList] = useState([]);
    const [userid, setUserID] = useState('');
    const [movieid, setMovieID] = useState('');
    const [watched, setWatched] = useState('');
    const [movie, setMovie] = useState([]);
    const[favorite, setFavorite] = useState([]);

useEffect(() => {
    console.log("getting one movie");
    var movieid= props.location.state[0].movieid;
    Axios.get("http://localhost:3001/api/getmovie?id=" + movieid)
    .then((response) => {
        setMovie(response.data);
    })
}, []);

const addFavorite = (movieid) => {
    console.log('adding favorite');
    Axios.post(`http://localhost:3001/api/insertfavorite`, {
        movieid: movieid
    })
    .then(() => alert('success'));
};

return (
  <div>
    <Nav/>
    <h1>Movie Page</h1>
    {movie.map((val) => {
        console.log("rendering the movie");
        return (
        <p>
          <br/> Movie: {val.name} 
          <br/> Year: {val.year} 
          <br/> Synopsis: {val.synopsis} 
          <br/> Platform Name: {val.platform_name}
          <br/> Platform Cost: {val.platform_cost} 
          <br/> Director ID: {val.director_id}
          <br/> <button onClick={() => addFavorite(val.movieid)}>Add Favorite</button>
        </p>
        );
      })}

  </div>
);
}


export default MoviePage;
