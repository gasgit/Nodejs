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

// pretty print
app.set('json spaces', 4);

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

// insert single document (insert)
app.get('/api/addSingleDoc/:name/:id/:height/:eye_col', function(req, res) {

    var name = req.params.name
    var id = req.params.id
    var height = req.params.height
    var eye_col = req.params.eye_col

    //var doc = { "name": name, "id": id, "height": height, "eye_col": eye_col }
    var doc = {
        "name": name,
        "id": id,
        "height": height,
        "eye_col": eye_col,
        "EMBEDDED_DOC": { "name": name, "id": id, "height": height, "eye_col": eye_col }
    }

    console.log(doc)

    //create insertSingle from params
    var insertSingle = function(db, callback) {
            // get the documents collection
            var collection = db.collection('mycollection');
            // insert single doc 
            collection.insert(doc, function(err, result) {
                assert.equal(err, null);
                console.log("Inserted 1 document mycollection");
                callback(result);
                //res.send("Inserted  documents mycollection");
                res.json(doc)

            });
        }
        // 
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertSingle(db, function() {
            db.close();
        });
    });

});


// insert multiple documents (insertMany)
app.get('/api/insertDocs', function(req, res) {

    var user = {
        "name": "bean",
        "id": 118,
        "height": 185,
        "eye_col": "green"
    }
    var user2 = {
        "name": "walters",
        "id": 117,
        "height": 158,
        "eye_col": "black"
    }
    var user3 = {
        "name": "astair",
        "id": 11233,
        "height": 160,
        "eye_col": "orange"
    }

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
                console.log("Inserted 3 documents mycollection");
                callback(result);
                res.send("Inserted 3 documents mycollection");

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

app.get('/api/findFilter/:id_value', function(req, res) {

    var id_value = req.params.id_value
    console.log(typeof(id_value))

    var findFilter = function(db, callback) {
        var collection = db.collection('mycollection');
        collection.find({
            "id": { $gt: parseInt(id_value) }
        }).toArray(function(err, result) {
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

app.get('/api/delete/:name_value', function(req, res) {

    var name_value = req.params.name_value
    console.log(name_value);

    var removeDocument = function(db, callback) {
        var collection = db.collection('mycollection');
        // delete one documents using params
        collection.deleteOne({
            "name": name_value
        }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Removed the document  " + name_value);
            callback(result);
            //res.send(result)
            res.send("Removed the document  " + name_value);

        });
    }

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        removeDocument(db, function() {
            db.close();
        });
    });

});


app.get('/api/update', function(req, res) {

});


console.log("Server running on 127.0.0.1:8000");
var server = app.listen(8000);