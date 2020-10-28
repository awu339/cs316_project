import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';

function Search() {
  const [title, setTitle] = useState('');
  const [searchResult, setResult] = useState([]);

  // useEffect(() => {
  //     Axios.get("http://localhost:3001/api/getsearchtitle")
  //     .then((response) => {
  //       console.log("response" + response);
  //       setResult(response.data);
  //     }); 
  //   }, []);

  const submitQuery = () => {
      console.log('submit query')

      console.log(title);
      Axios.get("http://localhost:3001/api/getsearchtitle?title=" + title)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setResult(response.data);
      });

  };

  return (
    <div>
      <Nav />
      <h1>Search</h1>
      <div className="search">
        <input 
          type="text" 
          name="title" 
          onChange={(e)=> {
            setTitle(e.target.value)
          }} 
        />
        <button onClick = {submitQuery}>Search</button>
      </div>

      <div className="resultsBox">
        {searchResult.map((val) => {
          return (  
          <p>
            <Link to={{ 
              pathname: "/MoviePage", 
              state: [{userid: 1, movieid: val.movieid, watched: 1}]  
            }}> 
               {val.name}
            </Link>
            , {val.year}
          </p>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
