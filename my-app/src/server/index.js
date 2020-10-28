const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/getusers", (req, res) => {
    const sqlSelect = "SELECT * FROM User;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/api/getmovies", (req, res) => {
    const sqlSelect = "SELECT * FROM Movie;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/api/getmovie", (req, res) => {
    let movieid = req.query.id;
    console.log(req.query)
    const sqlSelect = "SELECT * FROM Movie where movieid = ?;";
    db.query(sqlSelect, [movieid], (err, result) => {
        res.send(result);
        console.log(result);
    });
});

app.get("/api/getfavorites", (req, res) => {
    const sqlSelect = "SELECT m.name as name, m.year as year, m.synopsis as synopsis, f.movieid as movieid FROM Movie as m, Favorites as f WHERE f.userid = 1 and f.movieid = m.movieid;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/api/getsearchtitle", (req, res) => {
    let title = req.query.title;
    let sql = "SELECT * FROM Movie WHERE name LIKE '%" + title + "%'";
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
});

app.post('/api/insert', (req, res) => {
    console.log('here1');
    const userID = req.body.userID;
    const username = req.body.username;
    const pwd = req.body.pwd;
    const type = req.body.type;
    const date = req.body.date;

    const sqlInsert = "INSERT INTO User (userID, username, password, type, date_created) VALUES(?, ?, ?, ?, ?)";
    db.query(sqlInsert, [userID, username, pwd, type, date], (err, result) => {
        console.log('here');
        console.log(result);
        console.log(err);
    });
});

app.post('/api/insertfavorite', (req, res) => {
    console.log('here fav');
    console.log(req);
    const userID = 1;
    const movieid = req.body.movieid;
    const watched = 1;

    const sqlInsert = "INSERT INTO Favorites (userID, movieid, watched) VALUES(?, ?, ?)";
    db.query(sqlInsert, [userID, movieid, watched], (err, result) => {
        console.log('here');
        console.log(result);
        console.log(err);
    });
});

app.get('/api/delete', (req, res) => {
    console.log("rjgejrbgergrehg");
    var movieidval = req.query.id;
    console.log("movieid: " + movieidval);
    console.log(req.query);
    //console.log(req.body);

    const sqlDelete = "DELETE FROM Favorites WHERE movieid = ?";
    db.query(sqlDelete, [movieidval], (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(3001, () => {
    console.log('running server on port 3001');
}); 

// const sqlInsert = "INSERT INTO User VALUES(1, 
// 'sarah', 'pwd', 'user', '2020-09-01')";
//     db.query(sqlInsert, (err, result) => {
//         res.send("hello");
//     });