import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);
  const [movieid, setMovieID] = useState([]);
 
  const unfavorite = (movieid) => {
    Axios.delete(`http://localhost:3001/api/delete`, {
      movieid: movieid
    });
  };
 
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getfavorites")
    .then((response) => {
      setFavoritesList(response.data);
    }); 
  }, []);  
 
  return (
    <div>
      <Nav />
      <h1>Favorites</h1>
      {favoritesList.map((val) => {
        return (
        <p>
          Movie: {val.name}
          Year: {val.year}
          Synopsis: {val.synopsis}
 <button onClick={() => {unfavorite(val.movieid)}}> Unfavorite </button>
 
 
        </p>
        );
      })}
    
    </div>
  );
}
 
export default Favorites;
