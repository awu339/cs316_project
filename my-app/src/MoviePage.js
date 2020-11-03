import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function MoviePage(props) {
    const [movieList, setMovieList] = useState([]);
    const [userid, setUserID] = useState('');
    const [movieid, setMovieID] = useState('');
    const [watched, setWatched] = useState('');
    const [movie, setMovie] = useState([]);
    const[favorite, setFavorite] = useState([]);
    const [reviews, setReviews] = useState([]);
    var [username, setUsername] = useState('');
    var [rating, setRating] = useState("");
    var [review, setReview] = useState("");
    var [date, setDate] = useState("");

useEffect(() => {
    console.log("getting one movie");
    var movieid= props.location.state[0].movieid;
    Axios.get("http://localhost:3001/api/getmovie?id=" + movieid)
    .then((response) => {
        setMovie(response.data);
    })
    Axios.get("http://localhost:3001/api/getreviews?id=" + movieid)
    .then((response) => {
      setReviews(response.data);
    })
}, []);

const addFavorite = (movieid) => {
    console.log('adding favorite');
    Axios.post(`http://localhost:3001/api/insertfavorite`, {
        movieid: movieid
    })
    .then(() => alert('success'));
};

const getUsername = (userid) => {
  Axios.get(`http://localhost:3001/api/getusername`, {
        userid: userid
    })
    .then((response) => {
      console.log('get username' + response.data);
      return response.data;
    })
};

const submitReview = () => {
  var movieid = props.location.state[0].movieid;
  setDate("" + Date.now());
  console.log('date' + date);
  console.log("getting here");
  Axios.post('http://localhost:3001/api/submitreview', {
      rating: rating,
      review: review,
      date: date,
      movieid: movieid
  }).then(() => {
      alert("success");
      console.log("actually getting here");
  });
  window.location.href = "http://localhost:3000/MoviePage";
};

return (
  <div>
    <Nav/>
    <h1>Movie Page</h1>
    {movie.map((val) => {
        console.log("rendering the movie");
        return (
        <p>
          Movie: {val.name} 
          <br/> Year: {val.year} 
          <br/> Genre: {val.genre} 
          <br/> Synopsis: {val.plot} 
          <br/> Director: {val.director}
          <br/> Actors: {val.actors} 
          <br/> Runtime: {val.runtime}
          <br/> <button onClick={() => addFavorite(val.movieid)}>Add Favorite</button>
        </p>
        );
      })}

    <h1>Leave a Review</h1>
    <label>Rating</label> 
    <input
      type="number"
      min="0"
      max="5"
      name="rating"
      onChange={(e) => {
        setRating(e.target.value);
      }}
    />
    <br/> <label>Review</label> 
    <input
      type="text"
      name="review"
      onChange={(e) => {
        setReview(e.target.value);
      }}
    />
            
    <br/><button onClick = {submitReview}>Submit</button>

    <h1>All Reviews</h1>
    {reviews.map((val) => {
      return (
        <p>
          User: {val.userid} | 
          Rating: {val.rating} | 
          Date: {val.date}
          <br/> Review: {val.content}
        </p>
      );
    })}
  </div>
);
}

export default MoviePage;
