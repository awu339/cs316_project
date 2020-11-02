import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Home() {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/gettopmovies")
    .then((response) => {
      setTopMovies(response.data);
    }); 
  }, []);

  useEffect(() => {
    var id = 3896150;

    while (id < 3896200) {
      fetch("http://www.omdbapi.com/?i=tt" + id + "&type=movie&apikey=1e2df624")
      .then(response => response.json())
      .then(data => {
        if (data.Type == "movie") {
          console.log("movie");
          console.log(data); 
        }
      });
      id++;
    }



    
  })

  return (
    <div>
      <Nav/>
      <h1>Top trending movies 2020</h1>

      {topMovies.map((movie) => {
        return (
        <p>
          {movie.name} |
          Rating: {movie.rating}
        </p>
        );
      })}

      <h1>Recommended movies</h1>
    </div>
  );
}

export default Home;

//<img src = "titanic_movieposter.jpg" alt ="image"/>