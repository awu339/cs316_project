import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Button } from 'reactstrap';
//import { Button } from 'react-bootstrap';


function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);
  
  let unfavorite = (movieid) => {
    console.log("movieid: " + movieid);
    Axios.get("http://localhost:3001/api/delete?id=" + movieid);
  };

  let watched = (movieid) => {
    console.log("watched" + movieid);
    Axios.get("http://localhost:3001/api/watched?id=" + movieid);
  };
 
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getfavorites")
    .then((response) => {
      setFavoritesList(response.data);
      //console.log(response.data);
    }); 
  }, []);   

  return (
    <div>
      <Nav />
      <h1>Favorites</h1>
          {favoritesList.map((val) => {
    
          var watchval = "";
          if (val.watched == 1){
            var watchval = "Yes"
          }
          else{
            var watchval = "No"
          }
          return (
            <p>
              Movie: {val.name} |
              Year: {val.year} | 
              Synopsis: {val.synopsis} |
              Watched: {watchval}
              <br />
              <button  class="button" onClick={() => {unfavorite(val.movieid)}}> Unfavorite </button> 
              {' '}
              <button  class="button" onClick={() => {watched(val.movieid)}}> Watched </button>
           </p>
          );
          })} 
    </div>
  );
}
 
export default Favorites;
