// add dependencies
var express = require('express');

var router = express.Router();

// 
var sqlite3 = require('sqlite3').verbose();
//
var db = new sqlite3.Database('testDB.db');

var bodyParser = require('body-parser')

var path = require("path");

var app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res) {
    console.log("Hello World , sqlite & node console!");
    res.send("Hello World , sqlite & node browser!")
});


app.get('/api/menu', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/menu.html'));
});


app.get('/api/createPeople', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/addPeople.html'))
});


app.post('/api/create_post', urlencodedParser, function(req, res) {

    var id = req.body.id
    var name = req.body.name
    var height = req.body.height
    var eye_col = req.body.eye_col

    response = {
        id: req.body.id,
        name: req.body.name,
        height: req.body.height,
        eye_col: req.body.eye_col
    };

    db.run("INSERT INTO people VALUES (?, ?, ?,?)", [id, name, height, eye_col]);

    res.end(JSON.stringify(response))
});

app.get('/api/showPeople', function(req, res) {
    var db_details = db.all("SELECT * FROM people;", function(err, rows) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.json({ "data": rows });
        }
    });
    db.close();
    console.log(db_details)
});

app.get('/api/updatePeople', function(req, res) {
    res.send("update!!")
});




console.log("Server running on 127.0.0.1:8000")
var server = app.listen(8000);