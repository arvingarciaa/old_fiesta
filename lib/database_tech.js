/*
* Module Dependency
* */
const config = require('./../config/config_tech');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// initialize db to null
let _db = null;
module.exports = {
  /*
  * Connect to database server using URL from config
  * */
  connect: function (callback) {
    if(_db){
      return callback({
        success: true,
        message:'Already connected to database!'
      });
    }
    MongoClient.connect(config.mongodb.url, function (err, database) {
      if (err) return callback({success: false, message: err});
      _db = database;
      return callback({
        success: true,
        message:'Database connection established!'
      });
    });
  },

  /*
  * Return a database connection
  * */
  getDb: function () {
    return _db;
  },

  /*
  * Returns an ObjectID constructor
  * */
  ObjectID: ObjectID,

  /*
  * Returns a function to handle database error
  * */
  serverDown: function (res) {
    res.status(500).send({message: 'Database server is down!'});
  },

  /*
  * Returns a function to handle database error
  * */
  databaseError: function (res, error) {
    res.status(520).send({message: error.toString()});
  },
};
