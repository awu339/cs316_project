import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function Movies() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getmovies")
    .then((response) => {
      setMovieList(response.data);
    }); 
  }, []);

  return (
    <div>
      <Nav/>
      <h1>Movies</h1>
      {movieList.map((val) => {
        console.log("this movie id: " + val.movieid);
        return (
        <p>
        <Link to={{ 
          pathname: "/MoviePage", 
          state: [{userid: 1, movieid: val.movieid, watched: 1}]  
          }}> {val.movieid} </Link>
          Movie: {val.name} |
          Year: {val.year}
        </p>
        );
      })}
    </div>
  );
}

export default Movies;
