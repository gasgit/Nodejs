// use express module
var express = require('express');
// create app
var app = express();
// use mongodb client 
var MongoClient = require('mongodb').MongoClient;
// use assert module
var assert = require('assert');
// use mongodb client for ObjectId
var ObjectId = require('mongodb').ObjectID;
// create url to connect to db, already created on mongo are are GLEN_TEST (database) and mycollection (collection)
var url = 'mongodb://localhost:27017/GLEN_TEST';

// default route testing display browser and console
app.get('/', function(req, res) {
    console.log("Hello World from Node And Express :)");
    res.send("Hello World from Node And Express :)");
});

// route to return an array of all docs in collection
app.get('/api/allDocuments', function(req, res) {

    var findDocuments = function(db, callback) {
            // get the documents collection
            var collection = db.collection('mycollection');
            // find some documents and store in an array
            collection.find({}).toArray(function(err, docs) {
                assert.equal(err, null);
                console.log(docs);
                callback(docs);
                res.send(docs);
            });
        }
        // open connection and call findDocuments
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findDocuments(db, function() {
            db.close();
        });
    });

});

app.get('/api/insertDocs', function(req, res) {

    var user = { "name": "bean", "id": 118, "height": 185, "eye_col": "green" }
    var user2 = { "name": "walters", "id": 117, "height": 158, "eye_col": "black" }
    var user3 = { "name": "astair", "id": 11233, "height": 160, "eye_col": "orange" }

    // create insertDocuments function and callback
    var insertDocuments = function(db, callback) {
            // get the documents collection
            var collection = db.collection('mycollection');
            // insert some documents( many or one as an array, check results)
            collection.insertMany([
                user, user2, user3
            ], function(err, result) {
                assert.equal(err, null);
                assert.equal(3, result.result.n);
                assert.equal(3, result.ops.length);
                console.log("Inserted 3 documents into the collection");
                callback(result);
                res.send("Inserted 3 documents into the collection");

            });
        }
        // 
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocuments(db, function() {
            db.close();
        });
    });

});

app.get('/api/findFilter', function(req, res) {

    var findFilter = function(db, callback) {
        var collection = db.collection('mycollection');
        collection.find({ "id": { $gt: 100 } }).toArray(function(err, result) {
            assert.equal(err, null);
            callback(result);
            res.send(result);
        });
    }

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findFilter(db, function() {
            db.close();
        });
    });
});

app.get('/api/update', function(req, res) {

});

app.get('/api/delete', function(req, res) {

});

console.log("Server running on 127.0.0.1:8000");
var server = app.listen(8000);