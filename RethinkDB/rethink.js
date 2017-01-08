// make sure rethinkdb server is running 
r = require('rethinkdb');


var connection = null;

// connect and create table 
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if (err) throw err;
    connection = conn;
    //console.log(connection)
    console.log("Connected to RethinkDB Server :) on http://localhost:28015")

    r.db('test').tableCreate('legends').run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })
})