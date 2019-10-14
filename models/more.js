'use strict';
const ObjectId = require('./../lib/database').ObjectID;

/*
  More Model
*/
function More(db) {
  this.db = db;
}

More.prototype.getMores = function (fiestaId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
  };

  this.db.find(query).toArray(function (err, mores) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, mores);
  });
};

More.prototype.getMore = function (fiestaId, moreId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(moreId),
  };
  this.db.findOne(query, function (err, more) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!more)
      return callback({
        statusCode: 404,
        message: 'More with ID ['+moreId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, more);
  });
};

More.prototype.addMore = function (fiestaId, more, callback) {
  if(!more.title || !more.body || more.title.trim()=='' || more.body.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting more!',
      error: new Error('Invalid paramaters for inserting more!')
    }, null);
  }

  let newMore = {
      fiestaId: new ObjectId(fiestaId),
      'title': more.title.trim(),
      'body': more.body.trim()
  };

  this.db.insertOne(newMore, function (err, response) {
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

More.prototype.editMore = function (fiestaId, moreId, data, callback) {
  if(!data.title || !data.body || data.title.trim()=='' || data.body.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting more!',
      error: new Error('Invalid paramaters for inserting more!')
    }, null);
  }

  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(moreId),
  };

  let details = {};
  if(data.title)
    details.title = data.title;
  if(data.body)
    details.body = data.body;

  let updates = {'$set': details};
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
        message: 'More with ID ['+fiestaId+'] is not found',
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

More.prototype.removeMore = function (fiestaId, moreId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(moreId),
  };
  this.db.remove(query, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (response && (response.result.n!=1))
      return callback({
        statusCode: 404,
        message: 'More with ID ['+moreId+'] is not found',
        error: err
      }, null);
    else if(!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      return callback(null, {success: true, message: 'Successfully removed more!'});
  });
};

module.exports = More;
