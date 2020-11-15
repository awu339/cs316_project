import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function Friends() {
    const [friendFavList, setFriendFavList] = useState([]);
    const userid1 = localStorage.getItem('userid');

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getfriends?id=" + userid1)
        .then((response) => {
          setFriendFavList(response.data);
          console.log(response.data);
        }); 
    }, []);  

    let unfriend = (userid) => {
        Axios.get("http://localhost:3001/api/unfriend?id=" + userid1 + "&userid=" + userid);
        //Axios.get('http://localhost:3001/api/delete', { id: movieid, userid: userid });
        window.location.href = "/Friends";
      };
      
    return (
        <div>
            <Nav/>
            <h1>Friends</h1> 
            {friendFavList.map((val) => {
            return (
                <p>
                Username: 
                <Link to={{ 
                pathname: "/FriendPage", 
                state: [{userid: val.userid, username: val.username}]  
                }}> {val.username} </Link>
                <br />
                <Button outline color="primary" className="w-25" onClick={() => unfriend(val.userid)}>Remove Friend</Button>
            </p>
            );        
            })}        
        </div>
    );
}
    
export default Friends;
    