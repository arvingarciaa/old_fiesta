'use strict';
const mongo = require('./../lib/database');
const Poster = require('./../models/poster');
const collectionName = 'fiesta_poster';

/**********************************************
* Functions for the Fiesta Poster API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let poster = new Poster(db);
  let fiestaId = req.params.fiestaId;
  poster.getPosters(fiestaId, function (err, posters) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(posters);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let poster = new Poster(db);
  let fiestaId = req.params.fiestaId;
  poster.addPoster(fiestaId, req, res, function (err, newPoster) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newPoster);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let poster = new Poster(db);
  let fiestaId = req.params.fiestaId;
  let posterId = req.params.posterId;
  poster.getPoster(fiestaId, posterId, function (err, foundPoster) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundPoster);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let poster = new Poster(db);
  let fiestaId = req.params.fiestaId;
  let posterId = req.params.posterId;
  poster.editDetails(fiestaId, posterId, req.body, function (err, updatedPoster) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedPoster);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let poster = new Poster(db);
  let fiestaId = req.params.fiestaId;
  let posterId = req.params.posterId;
  poster.editImage(fiestaId, posterId, req, res, function (err, foundPoster) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundPoster);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let poster = new Poster(db);
  let fiestaId = req.params.fiestaId;
  let posterId = req.params.posterId;
  poster.removePoster(fiestaId, posterId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
