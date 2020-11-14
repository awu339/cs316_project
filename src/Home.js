import React, { useState, useEffect} from 'react';
import { Row, Col, Container } from 'reactstrap';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { values } from 'mobx';
import image from './nomovie.jpg';


function Home() {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const userid = localStorage.getItem('userid');
  const username = localStorage.getItem('username');

  const [profileInfo, setProfileInfo] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getprofile?id=" + userid)
    .then((response) => {
      setProfileInfo(response.data);
      //console.log(response.data);
    }); 
  }, []);  

  useEffect(() => {
    Axios.get("http://localhost:3001/api/gettopmovies")
    .then((response) => {
      if (response != null){
        setTopMovies(response.data);
      }
     
    }); 
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getrecentmovies")
    .then((response) => {
      setRecentMovies(response.data);
    }); 
  }, []);

  return (
   
    <div>
      <Nav/>
      <h1>Welcome {username}!</h1>
      {profileInfo.map((val) => {
        return (
        <p>
          User type: {val.type} | 
          Date created: {val.date_created}
        </p>
        );
      })}

      <Container fluid>
      <Row>
        <Col>
        <h1>Top trending movies 2020</h1>
 
        {topMovies.map((movie) => {
          console.log(movie.poster);
          if(movie.poster == "N/A"){
            return (
            
              <div>
                {movie.name} | Rating: {movie.rating}
                <Link to={{ 
                  pathname: "/MoviePage", 
                  state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                  }}> 
                  <img className="icon-img" src={image}  alt="poster"/>
                </Link>
              </div>
              );
          }
          else{  
            return (
            
              <div>
                {movie.name} | Rating: {movie.rating}
                <Link to={{ 
                  pathname: "/MoviePage", 
                  state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                  }}> 
                  <img className="movie-img" src={movie.poster} alt="poster"/> 
                  
                </Link>
              </div>
              );
          }
          
        })}
        </Col>
        <Col>
        <h1>Recent Movies</h1>
          {recentMovies.map((movie) => {
            if(movie.poster == "N/A"){
              return (
                <div>
                  {movie.name} | 
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                    }}> 
                    <img className="icon-img" src={image} alt={movie.name}/>
                  </Link>
                </div>
                );
            }
            else{ 
              return (
            
                <div>
                  {movie.name} | 
                  <Link to={{ 
                    pathname: "/MoviePage", 
                    state: [{userid: userid, movieid: movie.movieid, watched: 1}]  
                    }}> 
                    <img className="movie-img" src={movie.poster} alt={movie.name}/>
                  </Link>
                  </div>
               
                );

           }
            
          })}
    
        </Col>
      </Row>
    </Container>

      
    </div>
  );
     
}

export default Home;

//<img src = "titanic_movieposter.jpg" alt ="image"/>