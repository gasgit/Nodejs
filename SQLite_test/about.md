# SQLite

## npm install sqlite3

```javascript

// add dependencies
var sqlite3 = require('sqlite3').verbose();
// create new db 
var db = new sqlite3.Database('testDB.db');

```

```javascript
// drop table people, start new
db.run("DROP TABLE people;")
```

```javascript
// create table people
db.run("CREATE TABLE people (id, name, height, eye_col)");
```
