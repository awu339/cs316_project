import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function Search() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [searchResult, setResult] = useState([]);
  const [dropdownType, setType] = useState('');

  const submitQuery = () => {
    console.log('submit query')

    if (dropdownType == "Title" || dropdownType == "") {
      console.log(title);
      Axios.get("http://localhost:3001/api/getsearchtitle?title=" + title)
      .then((response) => {
        setResult(response.data);
      });
    } else if (dropdownType == "Year") {
      Axios.get("http://localhost:3001/api/getsearchyear?year=" + year)
      .then((response) => {
        setResult(response.data);
      });
    } else {
      console.log("Invalid search submitted")
    }
  };

  const options = [
    'Title', 'Year'
  ];
  const defaultOption = options[0];

  return (
    <div>
      <Nav />
      <h1>Search</h1>
      <div className="search">
        <Dropdown 
          options={options} 
          value={defaultOption} 
          placeholder="Search by..." 
          onChange={(e) => {
            setType(e.value);
            console.log(e.value);
          }}
        />
        <input 
          type="text" 
          name="title" 
          onChange={(e) => {
              if (dropdownType == "Title" || dropdownType == "") {
                console.log('setting title');
                setTitle(e.target.value);
              } else if (dropdownType == "Year") {
                setYear(e.target.value);
              } else {
                // Do nothing for now
              }
            }
          }
        />
        <button onClick = {submitQuery}>Search</button>
      </div>

      <div className="resultsBox">
        {searchResult.map((val) => {
          return (  
          <ul>
            <Link to={{ 
              pathname: "/MoviePage", 
              state: [{userid: 1, movieid: val.movieid, watched: 1}]  
            }}> 
               {val.name}
            </Link>
            , {val.year}
          </ul>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
