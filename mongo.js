// use mongodb client 
var MongoClient = require('mongodb').MongoClient;
// use assert module
var assert = require('assert');
// use mongodb client for ObjectId
var ObjectId = require('mongodb').ObjectID;
// create url to connect to db, already created on mongo are are GLEN_TEST (database) and mycollection (collection)
var url = 'mongodb://localhost:27017/GLEN_TEST';


// 
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

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('mycollection');
    // Insert some documents
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

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    insertDocuments(db, function() {
        db.close();
    });
});

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('mycollection');
    // Find some documents
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

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findDocuments(db, function() {
        db.close();
    });
});


var findDocumentsFilter = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('mycollection');
    // Find some documents
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

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findDocumentsFilter(db, function() {
        db.close();
    });
});