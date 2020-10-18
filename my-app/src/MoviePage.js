import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function Movies() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getmovies")
    .then((response) => {
      setMovieList(response.data);
    }); 
  }, []);

  return (
    <div>
      <h1>Movies</h1>
        <p>
          Movie: {val.name} |
          Year: {val.year}
        </p>
        );
    </div>

    
  );
}

export default MoviePage;
