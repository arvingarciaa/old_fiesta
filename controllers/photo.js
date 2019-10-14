'use strict';
const mongo = require('./../lib/database');
const Photo = require('./../models/photo');
const collectionName = 'fiesta_photo';

/**********************************************
* Functions for the Fiesta Photo API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let photo = new Photo(db);
  let fiestaId = req.params.fiestaId;
  photo.getPhotos(fiestaId, function (err, photos) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(photos);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let photo = new Photo(db);
  let fiestaId = req.params.fiestaId;
  photo.addPhoto(fiestaId, req, res, function (err, newPhoto) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newPhoto);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let photo = new Photo(db);
  let fiestaId = req.params.fiestaId;
  let photoId = req.params.photoId;
  photo.getPhoto(fiestaId, photoId, function (err, foundPhoto) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundPhoto);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let photo = new Photo(db);
  let fiestaId = req.params.fiestaId;
  let photoId = req.params.photoId;
  photo.editDetails(fiestaId, photoId, req.body, function (err, updatedPhoto) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedPhoto);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let photo = new Photo(db);
  let fiestaId = req.params.fiestaId;
  let photoId = req.params.photoId;
  photo.editImage(fiestaId, photoId, req, res, function (err, foundPhoto) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundPhoto);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let photo = new Photo(db);
  let fiestaId = req.params.fiestaId;
  let photoId = req.params.photoId;
  photo.removePhoto(fiestaId, photoId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
