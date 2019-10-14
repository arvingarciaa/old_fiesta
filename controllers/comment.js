const mongo = require('./../lib/database');
const Comment = require('./../models/comment');
const collectionName = 'fiesta_comments';
/**********************************************
* Functions for the Fiesta Comment API
**********************************************/
exports.findAll = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  comment.getComments(function (err, comments) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comments);
  });
};

exports.findByFiesta = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let fiestaId = req.params.fiestaId;
  let type = req.params.type;
  comment.getCommentsByFiesta(fiestaId, type, function (err, comments) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comments);
  });
};

exports.findByType = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let type = req.params.type;
  comment.getCommentsByType(type, function (err, comments) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comments);
  });
};

exports.findFiestaByDate = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let fiestaId = req.params.fiestaId;
  let type = req.params.type;
  let timestampBefore = req.params.timestampBefore;
  let timestampAfter = req.params.timestampAfter
  comment.getFiestaCommentsByDate(fiestaId, type, timestampBefore, timestampAfter, function (err, comments) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comments);
  });
};

exports.findTypeByDate = function (req, res, next) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let type = req.params.type;
  let timestampBefore = req.params.timestampBefore;
  let timestampAfter = req.params.timestampAfter
  comment.getTypeCommentsByDate(type, timestampBefore, timestampAfter, function (err, comments) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comments);
  });
};

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let fiestaId = req.params.fiestaId;
  let type = req.params.type;
  let typeId = req.params.typeId;
  comment.getComment(fiestaId, type, typeId, function (err, comments) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comments);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let fiestaId = req.params.fiestaId;
  comment.addComment(fiestaId, req.body, function (err, newComment) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newComment);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let commentId = req.params.commentId;
  comment.removeComment(commentId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};

exports.approve = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new Comment(db);
  let commentId = req.params.commentId;
  comment.approveComment(commentId, req.body, function (err, comment) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(comment);
  });
};
