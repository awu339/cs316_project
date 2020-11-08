import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from './Nav';

function Movies() {
  const [movieList, setMovieList] = useState([]);
  const [numMovies, setNumMovies] = useState(0);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getmovies")
    .then((response) => {
      setMovieList(response.data);
      const data = response.data;
      const length = response.data.length;
      setNumMovies(length);
    }); 
  }, []);

  return (
    <div> 
      <Nav/>
      <h1>Movies</h1>
      <p><b>Our database has {numMovies} total movies to explore.</b></p>
      {movieList.map((val) => {
        return (
        <p>
        <Link to={{ 
          pathname: "/MoviePage", 
          state: [{userid: userid, movieid: val.movieid, watched: 0}]  
          }}> See more </Link>
          {val.name} | {val.year}
        </p>
        );
      })}
    </div>
  );
}

export default Movies;
