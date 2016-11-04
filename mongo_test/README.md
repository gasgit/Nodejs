# explore mongodb
* create db
* create collection
* insert document

## create GLEN_TEST database 
```shell
>use GLEN_TEST
switched to db GLEN_TEST
>
```

## create mycollection
```shell
>db.createCollection("mycollection")
{ "ok" : 1 }
>
```

## create document shell
```shell
db.mycollection.insert({"name": "sean", "id": 118, "height": 185, "eye_col": "yellow"});
```

## create document js
```javascript
var user = { "name": "sean", "id": 118, "height": 185, "eye_col": "yellow" }
var user2 = { "name": "julie", "id": 117, "height": 158, "eye_col": "blue" }
var user3 = { "name": "fred", "id": 11233, "height": 160, "eye_col": "white" }
```