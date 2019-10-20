const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const { ensureAuthorized } = require('../config/auth');

// Database Query
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = require('../config/keys').mongoURI;

// Database Name
const dbName = 'test';

// Leaves Endpoint

// Get Leaves
router.get('/leaves', function (req, res) {

  const client = new MongoClient(url);

  // Use connect method to connect to the server
  client.connect(function (err) {

    const db = client.db(dbName);

    let findDocuments = function (db, callback) {
      // Get the documents collection
      const collection = db.collection('tpaLeaveSlots');
      // Find some documents
      collection.find({}).toArray(function (err, docs) {
            res.json(docs);
      });
    }

    findDocuments(db, function () { });

  });

});


// Post Leaves
router.post('/leaves', function (req, res) {
  
  const { date, agentOne, agentTwo } = req.body;
  console.log(req.body)
  const client = new MongoClient(url);

  // Use connect method to connect to the server
  client.connect(function (err) {

    const db = client.db(dbName);

      // post login here
      // ...
    
  });

});

module.exports = router;