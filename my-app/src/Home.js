import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    Axios.get("http://localhost:3001/api/gettopmovies")
    .then((response) => {
      setTopMovies(response.data);
    }); 
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getrecentmovies")
    .then((response) => {
      setRecentMovies(response.data);
    }); 
  }, []);

  return (
    <div>
      <Nav/>
      <h1>Top trending movies 2020</h1>

      {topMovies.map((movie) => {
        return (
        <div>
          {movie.name} | Rating: {movie.rating}
          <Link to={{ 
            pathname: "/MoviePage", 
            state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
            }}> 
            <img className="movie-img" src={movie.poster} alt="poster"/>
          </Link>
        </div>
        );
      })}

      <h1>Recent Movies</h1>
      {recentMovies.map((movie) => {
        return (
        <span className = "movie-span">
          <Link to={{ 
            pathname: "/MoviePage", 
            state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
            }}> 
            <img className="movie-img" src={movie.poster} alt={movie.name}/>
          </Link>
        </span>
        );
      })}
    </div>
  );
}

export default Home;

//<img src = "titanic_movieposter.jpg" alt ="image"/>