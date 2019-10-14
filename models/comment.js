'use strict';
const ObjectId = require('./../lib/database').ObjectID;

/*
  Comment Model
*/
function Comment(db) {
  this.db = db;
}

Comment.prototype.getComments = function (callback) {
  this.db.find().toArray(function (err, comments) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, comments);
  });
};

Comment.prototype.getCommentsByFiesta = function (fiestaId, type, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    'type': type
  };

  this.db.find(query).toArray(function (err, comments) {
    if (err)
      return callback({
        statusCode: 500,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, comments);
  });
};

Comment.prototype.getCommentsByType = function (type, callback) {
  let query = {
    'type': type
  };

  this.db.find(query).toArray(function (err, comments) {
    if (err)
      return callback({
        statusCode: 500,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, comments);
  });
};

Comment.prototype.getFiestaCommentsByDate = function (fiestaId, type, timestampBefore, timestampAfter, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    'type': type,
    'timestamp': {
      $gte: new Date(timestampBefore),
      $lte: new Date(timestampAfter)
    }
  };

  this.db.find(query).toArray(function (err, comments) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, comments);
  });
};

Comment.prototype.getTypeCommentsByDate = function (type, timestampBefore, timestampAfter, callback) {
  let query = {
    'type': type,
    'timestamp': {
      $gte: new Date(timestampBefore),
      $lte: new Date(timestampAfter)
    }
  };

  this.db.find(query).toArray(function (err, comments) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, comments);
  });
};

Comment.prototype.getComment = function (fiestaId, type, typeId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    'type': type,
    'typeId': new ObjectId(typeId),
  };

  this.db.find(query).toArray(function (err, comments) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else
      return callback(null, comments);
  });
};

Comment.prototype.addComment = function (fiestaId, comment, callback) {
  if(!comment.username || !comment.type || !comment.typeId || !comment.comment ||
      comment.username.trim()=='' || comment.type.trim()=='' || comment.typeId.trim()=='' ||
      comment.comment.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting likes!',
      error: new Error('Invalid paramaters for inserting likes!')
    }, null);
  }

  let newComment = {
    'fiestaId': new ObjectId(fiestaId),
    'username': comment.username,
    'type': comment.type,
    'typeId': new ObjectId(comment.typeId),
    'comment': comment.comment,
    'timestamp': new Date(),
    'approve': false
  };

  this.db.insertOne(newComment, function (err, response) {
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

Comment.prototype.removeComment = function (commentId, callback) {
  let query = {
    '_id': new ObjectId(commentId)
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
        message: 'Comment with ID ['+commentId+'] is not found',
        error: err
      }, null);
    else if(!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      return callback(null, {success: true, message: 'Successfully removed comment!'});
  });
};

Comment.prototype.approveComment = function (commentId, comment, callback) {
  let query = {
    '_id': new ObjectId(commentId),
  };

  let updates = {'$set': {approve: comment.approve}};
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
        message: 'Comment with ID ['+commentId+'] is not found',
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


module.exports = Comment;
