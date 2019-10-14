'use strict';
const mongo = require('./../lib/database');
const Profile = require('./../models/profile');
const collectionName = 'fiesta_profile';

/**********************************************
* Functions for the Fiesta Profile API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let profile = new Profile(db);
  let fiestaId = req.params.fiestaId;
  profile.getProfiles(fiestaId, function (err, profiles) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(profiles);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let profile = new Profile(db);
  let fiestaId = req.params.fiestaId;
  profile.addProfile(fiestaId, req, res, function (err, newProfile) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newProfile);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let profile = new Profile(db);
  let fiestaId = req.params.fiestaId;
  let profileId = req.params.profileId;
  profile.getProfile(fiestaId, profileId, function (err, foundProfile) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundProfile);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let profile = new Profile(db);
  let fiestaId = req.params.fiestaId;
  let profileId = req.params.profileId;
  profile.editDetails(fiestaId, profileId, req.body, function (err, updatedProfile) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedProfile);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let profile = new Profile(db);
  let fiestaId = req.params.fiestaId;
  let profileId = req.params.profileId;
  profile.editImage(fiestaId, profileId, req, res, function (err, foundProfile) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundProfile);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let profile = new Profile(db);
  let fiestaId = req.params.fiestaId;
  let profileId = req.params.profileId;
  profile.removeProfile(fiestaId, profileId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
