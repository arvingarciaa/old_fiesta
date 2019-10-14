'use strict';
const upload = require('./../utils/upload');
const ObjectId = require('./../lib/database_tech').ObjectID;
const File = require('./../utils/utils');

/*
  Cms Model
*/
function TechRequest(db) {
  this.db = db;
}

TechRequest.prototype.getAllRequests = function (callback) {
  this.db.find().toArray(function (err, requests) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, requests);
  });
};

TechRequest.prototype.addRequest = function (techId, request, callback) {
  if(!request.techId || !request.title || !request.email ||
      request.techId.trim()=='' || request.title.trim()=='' || request.email.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting requests!',
      error: new Error('Invalid paramaters for inserting requests!')
    }, null);
  }

  let newRequest = {
    'techId': new ObjectId(techId),
    'title': request.title,
    'email': request.email,
    'status': ''
  };

  this.db.insertOne(newRequest, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!response || response.insertedCount != 1 || !response.insertedId)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else
      return callback(null, response.ops[0]);
  });
};

TechRequest.prototype.changeStatus = function (requestId, request, callback) {
  let query = {
    '_id': new ObjectId(requestId),
  };

  let updates = {'$set': {status: request.status}};
  let options = {'new': true};
  this.db.findAndModify(query, [], updates, options, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Comment with ID ['+requestId+'] is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else {
      return callback(null, response.value);
    }
  });
};

module.exports = TechRequest;
