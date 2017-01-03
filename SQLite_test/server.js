// add dependencies
var express = require('express');
// add qlite module
var sqlite3 = require('sqlite3').verbose();
// create new db
var db = new sqlite3.Database('testDB.db');
// add body parser module forms
var bodyParser = require('body-parser')
    // add path module
var path = require("path");
// create app
var app = express();

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    // test route at index
app.get('/', function(req, res) {
    console.log("Hello World , sqlite & node console!");
    res.send("Hello World , sqlite & node browser!")
});
// route menu template
app.get('/api/menu', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/menu.html'));
});
// route ce=reate people form
app.get('/api/createPeople', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/addPeople.html'))
});
// route handle post from form
app.post('/api/create_post', urlencodedParser, function(req, res) {

    var id = req.body.id
    var name = req.body.name
    var height = req.body.height
    var eye_col = req.body.eye_col
        // create obj
    response = {
        id: req.body.id,
        name: req.body.name,
        height: req.body.height,
        eye_col: req.body.eye_col
    };

    db.run("INSERT INTO people VALUES (?, ?, ?,?)", [id, name, height, eye_col]);
    //db.close();

    res.end(JSON.stringify(response))
});
// route get all from table
app.get('/api/showPeople', function(req, res) {
    var db_details = db.all("SELECT * FROM people;", function(err, rows) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.json({ "data": rows });
        }
    });
    //db.close();
    console.log(db_details)
});


app.get('/api/deletePeople', function(req, res) {

    res.sendFile(path.join(__dirname + '/templates/delete_people.html'));

});

app.post('/api/process_delete', urlencodedParser, function(req, res) {

    var id = req.body.id
    console.log(id)

    db.run('DELETE FROM people WHERE id=(?);', [id]);
    res.end(res)

})

// route to update table
app.get('/api/updatePeople', function(req, res) {
    res.send("update!!")
});



console.log("Server running on 127.0.0.1:8000")
var server = app.listen(8000);