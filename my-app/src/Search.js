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
  const [numresults, setnumresults] = useState(0);

  const submitQuery = () => {
    if (dropdownType == "Title" || dropdownType == "") {
      Axios.get("http://localhost:3001/api/getsearchtitle?title=" + title)
      .then((response) => {
        setResult(response.data);
        setnumresults(response.data.length);
      });
    } else if (dropdownType == "Year") {
      Axios.get("http://localhost:3001/api/getsearchyear?year=" + year)
      .then((response) => {
        setResult(response.data);
        setnumresults(response.data.length);
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
          }}
        />
        <input 
          type="text" 
          name="title" 
          onChange={(e) => {
              if (dropdownType == "Title" || dropdownType == "") {
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
        <p>{numresults} results</p>
      </div>

      <div className="resultsBox">
        {searchResult.map((val) => {
          return (  
          <div>
            <img className="movie-img" src={val.poster} alt="poster"/>
            <span>
              <Link to={{ 
                pathname: "/MoviePage", 
                state: [{userid: 1, movieid: val.movieid, watched: 1}]  
                }}> 
                {val.name}
              </Link>
              , {val.year}
            </span>
            <hr/>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
