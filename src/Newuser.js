import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Nav from './Nav';
var duplicate_user = "";

function Newuser() {
    //const [userID, setUserID] = useState('');
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    var [type, setType] = useState('');
    const [userList, setUserList] = useState([]);

    /* useEffect(() => {
        Axios.get("http://localhost:3001/api/getusers")
        .then((response) => {
          setUserList(response.data);
        }); 
    }, []); */

    const submitUser = () => {
        console.log('here2');
        console.log(username);
        console.log(type);
        Axios.post('http://localhost:3001/api/insert', {
            //userID: userID, 
            username: username, 
            pwd: pwd, 
            type: type
        }).then(() => {
            alert("success");
        });
        checkDuplicate();
        //checkExist();
        //window.location.href = "http://localhost:3000/";
    };
    
   
    function checkDuplicate(){
      Axios.get("http://localhost:3001/api/checkduplicate?id=" + username)
      .then((response) => {
        console.log("check " + response.data[0].username);
        duplicate_user = response.data[0].username;
        if(duplicate_user.length > 0){
          alert("Username already taken. Please choose another one.");
        }
    });
    }


  function toggle() {
    var cont = document.getElementById('cont');
    if (cont.style.display == 'block') {
        cont.style.display = 'none';
    }
    else {
        cont.style.display = 'block';
    }
}

  return (
    <div>
      
      <h1>Register new user</h1>
        <div className="form">
           {/*  <label>UserID:</label>
            <input 
                type="text" 
                name="userID" 
                onChange={(e)=> {
                setUserID(e.target.value)
                }} 
            /> */}
            <label>Username:</label>
            <input 
                type="text" 
                name="username" 
                onChange={(e)=> {
                setUsername(e.target.value)
                }} 
            />
            <label>Password:</label>
            <input 
                type="text" 
                name="pwd" 
                onChange={(e)=> {
                setPwd(e.target.value)
                }} 
            />

                <label>Select User Type</label>
                <p>
            <select id="sel" onChange={toggle}>
            <option value="1" >User</option>
            <option value="2" selected>Admin</option>
        </select>
    </p>
  
    <div id="cont"
    style={{display:"block"}}>

        Admin Code: 
        <input 
                type="text" 
                name="type" 
                onChange={(e)=> {
                  if(e.target.value == "cs316") {
                    setType("admin");
                  } else {
                    setType("user");
                  }
                }} 
            />
    </div>
    
            
            <button onClick = {submitUser}>Submit</button>

             {/* {userList.map((val) => {
              return (
              <p>
                Username: {val.username} |
                Date created: {val.date_created}
              </p>
              );
            })} */}

            
        </div>
        
    </div>
  );
}

export default Newuser;