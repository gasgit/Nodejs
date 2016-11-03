// use mongodb client 
var MongoClient = require('mongodb').MongoClient;
// use assert module
var assert = require('assert');
// use mongodb client for ObjectId
var ObjectId = require('mongodb').ObjectID;
// create url to connect to db, already created on mongo are are GLEN_TEST (database) and mycollection (collection)
var url = 'mongodb://localhost:27017/GLEN_TEST';


// open connection, message when good
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");
    console.log("\n")
    db.close();
});


//create users to insert to mycollection
var user = { "name": "sean", "id": 118, "height": 185, "eye_col": "yellow" }
var user2 = { "name": "julie", "id": 117, "height": 158, "eye_col": "blue" }
var user3 = { "name": "fred", "id": 11233, "height": 160, "eye_col": "white" }


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
        });
    }
    // 
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocuments(db, function() {
        db.close();
    });
});

var findDocuments = function(db, callback) {
        // get the documents collection
        var collection = db.collection('mycollection');
        // find some documents and store in an array
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("------------   All Docs  --------------------------")
            console.log("\n")
            console.log("Found the following records");
            console.log("\n")
            console.log(docs)
            console.log("\n")
            console.log("------------   End All   ---------------------------")
            console.log("\n")

            callback(docs);
        });
    }
    // open connection and call findDocuments
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findDocuments(db, function() {
        db.close();
    });
});


var findDocumentsFilter = function(db, callback) {
        // get the documents collection 
        var collection = db.collection('mycollection');
        // find some documents by filter and store in an array
        collection.find({ 'name': "fred" }).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("-------------  Begin Filter -------------------------")
            console.log("\n")
            console.log("Found the following records by filter!!");
            console.log("\n")
            console.log(docs);
            console.log("\n")
            console.log("-------------  End  Filter  -------------------------")
            console.log("\n")

            callback(docs);
        });
    }
    // open connection and call findDocumentsFilter
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findDocumentsFilter(db, function() {
        db.close();
    });
});