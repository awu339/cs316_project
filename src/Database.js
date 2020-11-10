var express = require('../../../Library/Caches/typescript/2.9/node_modules/@types/express');
var mysql = require('../../../Library/Caches/typescript/2.9/node_modules/@types/mysql');
var app = express();

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

con.connect(function(err) {
    if (!!err) {
        console.log(err);
    } else {
        console.log('connected');
    }

    // con.query("CREATE DATABASE mydb", function(err, result) {
    //     if (err) throw err;
    //     console.log('db created');
    // });
    
    // if (err) throw err;
    // console.log("Connected!");
    // con.query("CREATE DATABASE mydb", function (err, result) {
    //   if (err) throw err;
    //   console.log("Database created");
    // });
});

  //this is the mysql part
app.get('/', function(req, resp) {
    con.query("select * from mydb", function(err, rows, fields) {
        if (!!err) {
            console.log('error here');
        } else {
            console.log('success');
        }
    });
})


app.listen(1337);