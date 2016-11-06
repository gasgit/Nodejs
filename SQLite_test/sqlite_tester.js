// testing grounds for sqlite


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

// drop table people
//db.run("DROP TABLE people;")

// create table people
//db.run("CREATE TABLE people (id, name, height, eye_col)");

// create table logs
//db.run("CREATE TABLE logs (id, date, time, name)");

//db.run("INSERT INTO logs VALUES(?,?,?,?)", [567,'23.01.90','12:12', 'jack']);

// create table places
//db.run("CREATE TABLE places (id, location, dept, level)");

// insert into table people
//db.run("INSERT INTO people VALUES (?, ?, ?,?)", [001, 'glen2', 180, 'green']);

//insert into table places
//db.run("INSERT INTO places VALUES (?, ?, ?,?)", [001,'galway','HR', 'mid']);

// select all form table people
db.each("SELECT * FROM people INNER JOIN places ON people.id = places.id;", function(err, row) {
    console.log(row);
});

db.each("SELECT * FROM logs;", function(err, row) {
    console.log(row);
});

// db.each("SELECT * FROM testDB.sqlite_master WHERE type='table';", function(err, row) {
//     console.log(row);
// });

db.close();