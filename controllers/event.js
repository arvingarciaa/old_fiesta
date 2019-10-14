'use strict';
const mongo = require('./../lib/database');
const Event = require('./../models/event');
const collectionName = 'fiesta_event';

/**********************************************
* Functions for the Fiesta Event API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let event = new Event(db);
  let fiestaId = req.params.fiestaId;
  event.getEvents(fiestaId, function (err, events) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(events);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let event = new Event(db);
  let fiestaId = req.params.fiestaId;
  event.addEvent(fiestaId, req, res, function (err, newEvent) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newEvent);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let event = new Event(db);
  let fiestaId = req.params.fiestaId;
  let eventId = req.params.eventId;
  event.getEvent(fiestaId, eventId, function (err, foundEvent) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundEvent);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let event = new Event(db);
  let fiestaId = req.params.fiestaId;
  let eventId = req.params.eventId;
  event.editDetails(fiestaId, eventId, req.body, function (err, updatedEvent) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedEvent);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let event = new Event(db);
  let fiestaId = req.params.fiestaId;
  let eventId = req.params.eventId;
  event.editImage(fiestaId, eventId, req, res, function (err, foundEvent) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundEvent);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let event = new Event(db);
  let fiestaId = req.params.fiestaId;
  let eventId = req.params.eventId;
  event.removeEvent(fiestaId, eventId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
