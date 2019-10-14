'use strict';
const mongo = require('./../lib/database');
const Activity = require('./../models/activity');
const collectionName = 'fiesta_activity';

/**********************************************
* Functions for the Fiesta Activity API
**********************************************/
exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let activity = new Activity(db);
  let fiestaId = req.params.fiestaId;
  activity.getActivities(fiestaId, function (err, activities) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(activities);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let activity = new Activity(db);
  let fiestaId = req.params.fiestaId;
  activity.addActivity(fiestaId, req.body, function (err, newActivity) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newActivity);
  });
};

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let activity = new Activity(db);
  let fiestaId = req.params.fiestaId;
  let activityId = req.params.activityId;
  activity.getActivity(fiestaId, activityId, function (err, foundActivity) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundActivity);
  });
};

exports.update = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let activity = new Activity(db);
  let fiestaId = req.params.fiestaId;
  let activityId = req.params.activityId;
  activity.editActivity(fiestaId, activityId, req.body, function (err, updatedActivity) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedActivity);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let activity = new Activity(db);
  let fiestaId = req.params.fiestaId;
  let activityId = req.params.activityId;
  activity.removeActivity(fiestaId, activityId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
