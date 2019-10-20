const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Database Query
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = require('../config/keys').mongoURI;

// Database Name
const dbName = 'test';

// Leaves Endpoint
router.get('/leaves', ensureAuthenticated, function (req, res) {


  const client = new MongoClient(url);
  // Use connect method to connect to the server
  client.connect(function (err) {
    assert.equal(null, err);

    const db = client.db(dbName);
    const findDocuments = function (db, callback) {
      // Get the documents collection
      const collection = db.collection('leaves');
      // Find some documents
      collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        docs.forEach(doc => {
          if (doc.team == req.user.team.toUpperCase()) {
            // change numbers to free or full
            doc2 = parseSlots(doc, doc.team);
            res.json(doc2);
          }
        });
      });
    }
    findDocuments(db, function () { });
  });

  // Close connection to server
  client.close();
});


module.exports = router;

function parseSlots(arr, team) {
  let tpaLimit = 6;
  let metlifeLimit = 6;

  // TPA slots are called
  if (team == "TPA") {
    // loop through the array and turn the numbers into string
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        if (arr[key] > tpaLimit) {
          arr[key] = "FULL";
        } else if (arr[key] < tpaLimit) {
          arr[key] = "FREE";
        }
      }
    }
  } else if (team == "METLIFE") {
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        if (arr[key] > metlifeLimit) {
          arr[key] = "FULL";
        } else if (arr[key] < metlifeLimit) {
          arr[key] = "FREE";
        }
      }
    }
  }

  return arr;
}