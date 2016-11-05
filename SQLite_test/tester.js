// testing grounds for sqlite


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testDB.db');

// drop table people
//db.run("DROP TABLE people;")

// create table people
//db.run("CREATE TABLE people (id, name, height, eye_col)");

// insert into table people
//db.run("INSERT INTO people VALUES (?, ?, ?,?)", ['glen2', 123, 180, 'green']);

// select all form table people
db.each("SELECT * FROM people", function(err, row) {
    console.log(row);
});



db.close();