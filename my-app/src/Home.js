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
      console.log(response.data);
    }); 
  }, []);

  //this code is used to load in movies
  useEffect(() => {
    var countInserted = 0;
    var id = 3902000;
    var actors;
    var director;
    var genre;
    var plot; 
    var name; 
    var year;
    var runtime;

    while (id < 3903000) {
      fetch("http://www.omdbapi.com/?i=tt" + id + "&type=movie&apikey=b84a0cfd")
      .then(response => response.json())
      .then(data => {
        if (data.Type == "movie") {
          //console.log(data);
          actors = data.Actors;
          director = data.Director;
          genre = data.Genre;
          plot = data.Plot;
          name = data.Title;
          year = data.Year;
          runtime = data.Runtime;
          countInserted++;
        }
      })
      .then(blah => {
        console.log(actors + director + genre);
        Axios.post('http://localhost:3001/api/loadmovies', {
          actors: actors, 
          director: director, 
          genre: genre,
          plot: plot,
          name: name,
          year: year,
          runtime: runtime
        }).then(() => {
            alert("success");
        });
      });
      id++;
      
    }
    console.log(id);
    console.log("inserted = " + countInserted);
  });

  return (
    <div>
      <Nav/>
      <h1>Top trending movies 2020</h1>

      {topMovies.map((movie) => {
        return (
        <p>
          {movie.name} | Rating: {movie.rating}
          <Link to={{ 
            pathname: "/MoviePage", 
            state: [{userid: 1, movieid: movie.movieid, watched: 1}]  
            }}> 
            <span> More</span>
          </Link>
        </p>
        );
      })}

      <h1>Recommended movies</h1>
    </div>
  );
}

export default Home;

//<img src = "titanic_movieposter.jpg" alt ="image"/>