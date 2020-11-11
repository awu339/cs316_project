const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
//const userid = localStorage.getItem('userid');
  

const db = mysql.createConnection({
    /* connectionLimit: 1000,
    connectionTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,  */
    host: 'vcm-17529.vm.duke.edu',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

db.connect();
/* db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "SELECT * FROM User;"

    db.query(sql, (err, result) => {
        console.log('here');
        console.log(result);
        console.log(err);
    });
}); */

if (db){
    console.log("success");
}
else{
    console.log("fail");
}

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
    const sqlSelect = "SELECT * FROM Movies order by year desc, name asc;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/api/getmovie", (req, res) => {
    let movieid = req.query.id;
    const sqlSelect = "SELECT * FROM Movies where movieid = ?;";
    db.query(sqlSelect, [movieid], (err, result) => {
        res.send(result);
    });
});

app.get("/api/getreviews", (req, res) => {
    let movieid = req.query.id;
    const sqlSelect = "SELECT * FROM Review where movieid = ?;";
    db.query(sqlSelect, [movieid], (err, result) => {
        res.send(result);
    });
});

app.get("/api/getfriends", (req, res) => {
    let userid = req.query.id;
    const sqlSelect = "SELECT u.username, u.userid FROM Friend f, User u WHERE f.user1 = ? and f.user2 = u.userid;";
    db.query(sqlSelect, [userid], (err, result) => {
        res.send(result);
    });
});

/* app.get("/api/getfriends", (req, res) => {
    const sqlSelect = "SELECT f.user2 FROM Friend f WHERE f.user1 = 1;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}); */

/* app.get("/api/getfavorites", (req, res) => {
    const sqlSelect = "SELECT m.name as name, m.year as year, m.synopsis as synopsis, f.movieid as movieid FROM Movie as m, Favorites as f WHERE f.userid = 1 and f.movieid = m.movieid;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}); */

app.get("/api/getfriendfav", (req, res) => {
    let userid = req.query.id;
    console.log(req.query);
    const sqlSelect = "SELECT m.name as name, m.year as year, m.plot as plot, f.movieid as movieid, f.watched as watched FROM Movies as m, Favorites as f WHERE f.userid = ? and f.movieid = m.movieid;";
    db.query(sqlSelect, [userid], (err, result) => {
        res.send(result);
        console.log(result);
    });
});

app.get("/api/getfavorites", (req, res) => {
    let userid = req.query.id;
    const sqlSelect = "SELECT m.name as name, m.year as year, m.plot as plot, f.movieid as movieid, f.watched as watched FROM Movies as m, Favorites as f WHERE f.userid = ? and f.movieid = m.movieid;";
    db.query(sqlSelect, [userid], (err, result) => {
        res.send(result);
    });
});

app.get("/api/getwatchvalue", (req, res) => {
    const sqlSelect = "SELECT watched FROM Favorites;";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.get("/api/getprofile", (req, res) => {
    let userid = req.query.id;
    const sqlSelect = "SELECT userid, username, type, date_created FROM User WHERE userid = ?;";
    db.query(sqlSelect, [userid], (err, result) => {
        res.send(result);
    });
});

app.get("/api/getusername", (req, res) => {
    let userid = req.query.id;
    const sqlSelect = "SELECT username FROM User WHERE userid = ?;";
    db.query(sqlSelect, [userid], (err, result) => {
        res.send(result);
    });
});

app.post('/api/submitreview', (req, res) => {
    let userid = req.body.userid;
    let rating = req.body.rating;
    let content = req.body.review;
    let movieid = req.body.movieid;
    let date = req.body.date;
    // const sqlInsert = "INSERT INTO Review (userid, movieid, rating, date, content) VALUES(?, ?, ?, ?, ?)";
    // db.query(sqlInsert, [uerid, movieid, rating, date, content], (err, result) => {
    // let date = parseInt(req.body.date);
    const sqlInsert = "INSERT INTO Review (userid, movieid, rating, date, content, report) VALUES(?, ?, ?, curdate(), ?, 0)";
    db.query(sqlInsert, [userid, movieid, rating, content], (err, result) => {
        console.log('here for review');
        console.log(result);
        console.log(err);
    });
});

app.get("/api/getsearchtitle", (req, res) => {
    let title = '%' + req.query.title + '%';
    console.log(title);
    let sql = "SELECT * FROM Movies WHERE name LIKE ? order by year desc;";
    db.query(sql, [title], (err, result) => {
        res.send(result);
        console.log(result);
        console.log(err);
        //console.log(result);
    })
});

app.get("/api/getsearchyear", (req, res) => {
    let year = req.query.year;
    let sql = "SELECT * FROM Movies WHERE year = ?;";
    db.query(sql, [year], (err, result) => {
        res.send(result);
        console.log(result);
    })
});

app.get("/api/getsearchgenre", (req, res) => {
    let genre = '%' + req.query.genre + '%';
    let sql = "SELECT * FROM Movies WHERE genre LIKE ? order by year desc;";
    db.query(sql, [genre], (err, result) => {
        res.send(result);
        console.log(result);
    })
});

app.get("/api/gettopmovies", (req, res) => {
    let sql = "WITH a AS (SELECT movieid, AVG(rating) as rating FROM Review GROUP BY movieid)";
    sql += "SELECT m.name, a.rating, m.movieid, m.poster FROM Movies m, a WHERE m.movieid = a.movieid ORDER BY a.rating desc;"
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
});

app.get("/api/getrecentmovies", (req, res) => {
    let sql = "SELECT * FROM Movies WHERE year = 2019 or year = 2020 order by year desc;"
    db.query(sql, (err, result) => {
        res.send(result);
        console.log(result);
    })
});

app.post('/api/insert', (req, res) => {
    console.log('here1');
    const username = req.body.username;
    const pwd = req.body.pwd;
    const type = req.body.type;
    console.log(username);
    let sql = "SELECT * FROM User;"
    const sqlInsert = "INSERT INTO User (username, password, type, date_created) VALUES(?, ?, ?, curdate());";
    db.query(sql, (err, result) => {
        console.log('here');
        console.log(result);
        console.log(err);
    });
    db.query(sqlInsert, [username, pwd, type], (err, result) => {
        console.log('here');
        console.log(result);
        console.log(err);
    });
});

app.post('/api/insertfavorite', (req, res) => {
    console.log('here fav');
    console.log(req);
    const userID = req.body.userid;
    const movieid = req.body.movieid;
    const watched = 0;

    const sqlInsert = "INSERT INTO Favorites (userID, movieid, watched) VALUES(?, ?, ?)";
    db.query(sqlInsert, [userID, movieid, watched], (err, result) => {
        console.log('here');
        console.log(result);
        console.log(err);
    });
});

//for friend fav
app.post('/api/insertfriendfavorite', (req, res) => {
    console.log('here fav');
    console.log(req.body.userid);
    const userID = req.body.userid;
    const movieid = req.body.movieid;
    const watched = 0;

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
    var userid = req.query.userid;
    //console.log("cur" + cur_userid);
    console.log("movieid: " + movieidval);
    console.log("userid: " + userid);
    console.log("query" + req.query);
    //console.log(req.body);
    //we need to replace userid 1 with whoever is logged in
    const sqlDelete = "DELETE FROM Favorites WHERE movieid = ? and userid = ?";
    db.query(sqlDelete, [movieidval, userid],  (err, result) => {
        if (err) console.log(err);
    });
});

app.get('/api/watched', (req, res) =>{
    console.log("watched indexjs");
    var movieidval = req.query.id;
    var userid = req.query.userid;
    const sqlWatched = "UPDATE Favorites SET watched = 1 WHERE movieid = ? and userid = ?";
    db.query(sqlWatched, [movieidval, userid], (err, result) =>{
        if(err) console.log(err);
    });
});

app.get('/api/watchvalue', (req, res) =>{
    console.log("watched VALUE");
    var movieidval = req.query.id;
    const sqlWatchValue = "SELECT f.watched FROM Favorites f WHERE movieid = ?";
    db.query(sqlWatchValue, [movieidval], (err, result) =>{
        if(err) console.log(err);
        res.send(result);
    });
});

app.get('/api/checkuser', (req, res) =>{
    var usernameval = req.query.id;
    console.log("check user " + usernameval);
    const sqlCheckUser = "SELECT password FROM User WHERE username = ?";
    db.query(sqlCheckUser, [usernameval], (err, result) =>{
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

app.get('/api/getuserid', (req, res) =>{
    var usernameval = req.query.id;
    console.log("check user " + usernameval);
    const sqlSelect = "SELECT userid, type FROM User WHERE username = ?";
    db.query(sqlSelect, [usernameval], (err, result) =>{
        if(err) console.log(err);
        console.log(result);
        res.send(result);
    });
});

app.get('/api/getname', (req, res) =>{
    //console.log("watched VALUE");
    var username = req.query.id;
    const sqlSelect = "SELECT username FROM User WHERE userid = ?";
    db.query(sqlSelect, [username], (err, result) =>{
        if(err) console.log(err);
        res.send(result);
    });
});

app.get('/api/report', (req, res) => {
    let reviewid = req.query.id;
    console.log(reviewid);
    const sqlUpdate = "UPDATE Review SET report = report + 1 WHERE reviewid = ?";
    db.query(sqlUpdate, [reviewid], (err, result) => {
        console.log('here for review');
        console.log(result);
        //console.log(err);
    });
});

app.get('/api/deletereview', (req, res) => {
    console.log("delete review");
    var reviewid = req.query.id;
    //console.log(req.body);
    //we need to replace userid 1 with whoever is logged in
    const sqlDelete = "DELETE FROM Review WHERE reviewid = ?";
    db.query(sqlDelete, [reviewid],  (err, result) => {
        if (err) console.log(err);
    });
});

app.post('/api/loadmovies', (req, res) => {
    var rows = req.body.rows;
    console.log(rows);

    const sql = "INSERT IGNORE INTO Movies (name, year, plot, genre, director, actors, runtime, poster) VALUES ?;"
    db.query(sql, [rows], (err, result) => {
        //console.log(res);
        console.log(err);
        //console.log(result);
    });
});

app.listen(3001, () => {
    console.log('running server on port 3001');
}); 
