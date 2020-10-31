import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
//import Button from 'react-bootstrap';

function Favorites() {
  const [favoritesList, setFavoritesList] = useState([]);
  const [watchVal, setWatchVal] = useState([]);
  const [watchVal2, setWatchVal2] = useState([]);
 
 
  let unfavorite = (movieid) => {
    console.log("movieid: " + movieid);
    Axios.get("http://localhost:3001/api/delete?id=" + movieid);
  };

  let watched = (movieid) => {
    console.log("watched" + movieid);
    Axios.get("http://localhost:3001/api/watched?id=" + movieid);
  };

/*   let watchvalue = (movieid) => {
    console.log("watch value" + movieid);
    Axios.get("http://localhost:3001/api/watchvalue?id=" + movieid)
    .then((response) => {
      setWatchVal2(response.data);
    });
    console.log(response.data);
    
  };  */
 
  useEffect(() => {
    Axios.get("http://localhost:3001/api/getfavorites")
    .then((response) => {
      setFavoritesList(response.data);
      console.log(response.data);
    }); 
  }, []);   

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getwatchvalue")
    .then((response) => {
      setWatchVal(response.data);
      console.log(response.data);
    }); 
  }, []);   
 
 
  return (
    <div>
      <Nav />
      <h1>Favorites</h1>
      {favoritesList.map((val) => {
        /* console.log("sifgsguhsuo" + val.movieid);
        var y = watchvalue(val.movieid)[0];
        console.log(y);
        console.log(watchvalue(val.movieid)); */
        return (
        <p>
          Movie: {val.name} |
          Year: {val.year} | 
          Synopsis: {val.synopsis} |
          Watched: 
         
          <br />
        
 <button onClick={() => {unfavorite(val.movieid)}}> Unfavorite </button>
 <button onClick={() => {watched(val.movieid)}}> Watched </button>
 
        </p>
        );
      })}
      {watchVal.map((val) => {
        if (val.watched == 1){
          var x = "Yes"
        }
        else{
          var x = "No"
        }
        return(

        <p>
          Watched: {x}
          </p>
          
        );
      
      })}

    
    </div>
  );
}
 
export default Favorites;
