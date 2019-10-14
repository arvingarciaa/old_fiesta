'use strict';
const ObjectId = require('./../lib/database').ObjectID;

/*
  Reaction Model
*/
function Reaction(db) {
  this.db = db;
}

Reaction.prototype.getReactions = function (fiestaId, type, typeId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    'type': type,
    'typeId': new ObjectId(typeId)
  };

  this.db.find(query).toArray(function (err, reactions) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, reactions);
  });
};

Reaction.prototype.getReaction = function (fiestaId, type, typeId, userId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    'userId': userId,
    'type': type,
    'typeId': new ObjectId(typeId),
  };

  this.db.findOne(query, function (err, reaction) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else
      return callback(null, reaction);
  });
};

Reaction.prototype.addReaction = function (fiestaId, reaction, callback) {
  if(!reaction.type || !reaction.typeId || !reaction.userId || !reaction.reaction ||
      reaction.type.trim()=='' || reaction.typeId.trim()=='' || reaction.userId.trim()=='' ||
      reaction.reaction.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting likes!',
      error: new Error('Invalid paramaters for inserting likes!')
    }, null);
  }

  let newReaction = {
    'fiestaId': new ObjectId(fiestaId),
    'userId': reaction.userId,
    'type': reaction.type,
    'typeId': new ObjectId(reaction.typeId),
    'reaction': reaction.reaction,
    'timestamp': new Date()
  };

  this.db.insertOne(newReaction, function (err, response) {
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

Reaction.prototype.removeReaction = function (fiestaId, type, typeId, userId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    'userId': userId,
    'type': type,
    'typeId': new ObjectId(typeId),
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
        message: 'Reaction with User ID ['+userId+'] is not found',
        error: err
      }, null);
    else if(!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      return callback(null, {success: true, message: 'Successfully removed reaction!'});
  });
};

Reaction.prototype.getReactionByDate = function (type, timestampBefore, timestampAfter, callback) {
  let query = {
    'type': type,
    'timestamp': {
      $gte: new Date(timestampBefore),
      $lte: new Date(timestampAfter)
    }
  };

  this.db.find(query).toArray(function (err, reactions) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, reactions);
  });
};


module.exports = Reaction;
