import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';

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
      <div className="form">
        <input 
          type="text" 
          name="title" 
          onChange={(e)=> {
            setTitle(e.target.value)
          }} 
        />
        <button onClick = {submitQuery}>Search</button>

        {searchResult.map((val) => {
          return (
          <p>
            {val.name}
          </p>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
