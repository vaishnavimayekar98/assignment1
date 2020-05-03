var express = require('express');
var cors = require('cors');
var mongo = require('mongodb');
var app = express();

mongo.connect('mongodb://localhost:27017/dbName', function(err, db) {
    db.createCollection('collectionName');
    var collectionName = db.collection('collectionName');

    var saveObject = {};

    app.get('/save/:query', cors(), function(req, res) {
        var query = req.params.query;

        saveObject = {
            "request": query,
            "time": Math.floor(Date.now() / 1000)
        }

        res.send(saveObject)

        collectionName.save(saveObject, function(err) {
            if (err) throw err;
        })
    })

    app.get('/find/:query', cors(), function(req, res) {
        var query = req.params.query;

        collectionName.find({'request': query}).toArray(function (err, result) {
            if (err) throw err;

            res.send(result);
        })

    })

})

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
})