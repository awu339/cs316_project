const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydb'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/insert', (req, res) => {
    const userID = req.body.userID;
    const username = req.body.username;
    const pwd = req.body.pwd;
    const type = req.body.type;
    const date = req.body.date;

    const sqlInsert = "INSERT INTO User VALUES(?, ?, ?, ?, ?)";
    db.query(sqlInsert, [userID, username, pwd, type, date], (err, result) => {
        console.log(result);
        console.log(err);
    });
})

app.listen(3001, () => {
    console.log('running server on port 3001');
}); 

// const sqlInsert = "INSERT INTO User VALUES(1, 
// 'sarah', 'pwd', 'user', '2020-09-01')";
//     db.query(sqlInsert, (err, result) => {
//         res.send("hello");
//     });