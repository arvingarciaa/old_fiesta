'use strict';
const mongo = require('./../lib/database');
const Video = require('./../models/video');
const collectionName = 'fiesta_video';

/**********************************************
* Functions for the Fiesta Video API
**********************************************/
exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let video = new Video(db);
  let fiestaId = req.params.fiestaId;
  video.getVideos(fiestaId, function (err, videos) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(videos);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let video = new Video(db);
  let fiestaId = req.params.fiestaId;
  video.addVideo(fiestaId, req.body, function (err, newVideo) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newVideo);
  });
};

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let video = new Video(db);
  let fiestaId = req.params.fiestaId;
  let videoId = req.params.videoId;
  video.getVideo(fiestaId, videoId, function (err, foundVideo) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundVideo);
  });
};

exports.update = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let video = new Video(db);
  let fiestaId = req.params.fiestaId;
  let videoId = req.params.videoId;
  video.editVideo(fiestaId, videoId, req.body, function (err, updatedVideo) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedVideo);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let video = new Video(db);
  let fiestaId = req.params.fiestaId;
  let videoId = req.params.videoId;
  video.removeVideo(fiestaId, videoId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
