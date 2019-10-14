const mongo = require('./../lib/database');
const Reaction = require('./../models/reaction');
const collectionName = 'fiesta_reactions';
/**********************************************
* Functions for the Fiesta Reaction API
**********************************************/

exports.findAll = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let reaction = new Reaction(db);
  let fiestaId = req.params.fiestaId;
  let type = req.params.type;
  let typeId = req.params.typeId;
  reaction.getReactions(fiestaId, type, typeId, function (err, reactions) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(reactions);
  });
}

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let reaction = new Reaction(db);
  let fiestaId = req.params.fiestaId;
  reaction.addReaction(fiestaId, req.body, function (err, newReaction) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newReaction);
  });
};

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let reaction = new Reaction(db);
  let fiestaId = req.params.fiestaId;
  let type = req.params.type;
  let typeId = req.params.typeId;
  let userId = req.params.userId;
  reaction.getReaction(fiestaId, type, typeId, userId, function (err, foundReaction) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundReaction);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let reaction = new Reaction(db);
  let fiestaId = req.params.fiestaId;
  let type = req.params.type;
  let typeId = req.params.typeId;
  let userId = req.params.userId;
  reaction.removeReaction(fiestaId, type, typeId, userId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};

exports.findByDate = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let reaction = new Reaction(db);
  let type = req.params.type;
  let timestampBefore = req.params.timestampBefore;
  let timestampAfter = req.params.timestampAfter
  reaction.getReactionByDate(type, timestampBefore, timestampAfter, function (err, reactions) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(reactions);
  });
}
