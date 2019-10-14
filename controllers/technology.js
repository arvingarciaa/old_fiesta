'use strict';
const mongo = require('./../lib/database');
const Technology = require('./../models/technology');
const collectionName = 'fiesta_featured_technology';

/**********************************************
* Functions for the Fiesta Technology API
**********************************************/
exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  let fiestaId = req.params.fiestaId;
  technology.getTechnologies(fiestaId, function (err, technologies) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(technologies);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  let fiestaId = req.params.fiestaId;
  technology.addTechnology(fiestaId, req, res, function (err, newTechnology) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newTechnology);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  let fiestaId = req.params.fiestaId;
  let technologyId = req.params.technologyId;
  technology.getTechnology(fiestaId, technologyId, function (err, foundTechnology) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundTechnology);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  let fiestaId = req.params.fiestaId;
  let technologyId = req.params.technologyId;
  technology.editDetails(fiestaId, technologyId, req.body, function (err, updatedTechnology) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedTechnology);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  let fiestaId = req.params.fiestaId;
  let technologyId = req.params.technologyId;
  technology.editImage(fiestaId, technologyId, req, res, function (err, foundTechnology) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundTechnology);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  let fiestaId = req.params.fiestaId;
  let technologyId = req.params.technologyId;
  technology.removeTechnology(fiestaId, technologyId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};

exports.findLocations = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  technology.getLocations(function (err, locations) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(locations);
  });
};

exports.findInstitutions = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  technology.getPartnerInstitutions(function (err, partnerInstitutions) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(partnerInstitutions);
  });
};

exports.findBeneficiaries = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let technology = new Technology(db);
  technology.getBeneficiaries(function (err, targetBeneficiaries) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(targetBeneficiaries);
  });
};
