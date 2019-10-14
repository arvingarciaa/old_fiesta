'use strict';
const mongo = require('./../lib/database');
const More = require('./../models/more');
const collectionName = 'fiesta_more';

/**********************************************
* Functions for the Fiesta More API
**********************************************/
exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let more = new More(db);
  let fiestaId = req.params.fiestaId;
  more.getMores(fiestaId, function (err, mores) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(mores);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let more = new More(db);
  let fiestaId = req.params.fiestaId;
  more.addMore(fiestaId, req.body, function (err, newMore) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newMore);
  });
};

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let more = new More(db);
  let fiestaId = req.params.fiestaId;
  let moreId = req.params.moreId;
  more.getMore(fiestaId, moreId, function (err, foundMore) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundMore);
  });
};

exports.update = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let more = new More(db);
  let fiestaId = req.params.fiestaId;
  let moreId = req.params.moreId;
  more.editMore(fiestaId, moreId, req.body, function (err, updatedMore) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedMore);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let more = new More(db);
  let fiestaId = req.params.fiestaId;
  let moreId = req.params.moreId;
  more.removeMore(fiestaId, moreId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
