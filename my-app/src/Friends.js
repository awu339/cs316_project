import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';

function Friends() {
    const [friendsList, setFriendsList] = useState([]);
    //const [name, setName] = useState([]);
    var name = [];
    var i = 0;
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getfriends")
        .then((response) => {
          setFriendsList(response.data);
          console.log(response.data);
          //getname(friendsList);
        }); 
    }, []);  
    
    
    /* let getname = (user2) => {
        console.log("getname " + user2);
        Axios.get("http://localhost:3001/api/getname?id=" + user2)
        .then((response) => {
          console.log("the name is");
          console.log(response.data[0].username);
          name.push(response.data[0].username);
          //setName(response.data[0].username);
        });
    } */;    

    return (
        <div>
            <Nav/>
            <h1>Friends</h1>
            
            {friendsList.map((val) => {
            //console.log("HELLO");
            //console.log(name);
            //getname(val.user2);  
            
            //i++;
            return (
                <p>
                Username: {val.username} 
                <br />
            </p>
            );
            
            })}
         {/*    {name.map((val) => {
            return (
                <p>
                name: {val} 
                <br />
            </p>
            );
            })} */}

        
        </div>

    );
}
    
export default Friends;
    