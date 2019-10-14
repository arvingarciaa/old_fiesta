'use strict';
const mongo = require('./../lib/database');
const Award = require('./../models/award');
const collectionName = 'fiesta_award';

/**********************************************
* Functions for the Fiesta Award API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let award = new Award(db);
  let fiestaId = req.params.fiestaId;
  award.getAwards(fiestaId, function (err, awards) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(awards);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let award = new Award(db);
  let fiestaId = req.params.fiestaId;
  award.addAward(fiestaId, req, res, function (err, newAward) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newAward);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let award = new Award(db);
  let fiestaId = req.params.fiestaId;
  let awardId = req.params.awardId;
  award.getAward(fiestaId, awardId, function (err, foundAward) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundAward);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let award = new Award(db);
  let fiestaId = req.params.fiestaId;
  let awardId = req.params.awardId;
  award.editDetails(fiestaId, awardId, req.body, function (err, updatedAward) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedAward);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let award = new Award(db);
  let fiestaId = req.params.fiestaId;
  let awardId = req.params.awardId;
  award.editImage(fiestaId, awardId, req, res, function (err, foundAward) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundAward);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let award = new Award(db);
  let fiestaId = req.params.fiestaId;
  let awardId = req.params.awardId;
  award.removeAward(fiestaId, awardId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
