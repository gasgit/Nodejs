// add dependencies
var express = require('express');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

var app = express();


app.get('/', function(req, res) {
    console.log("Hello World , sqlite & node console!");
    res.send("Hello World , sqlite & node browser!")
})

console.log("Server running on 127.0.0.1:8000")
var server = app.listen(8000);