const mongo = require('./../lib/database_tech');
const TechCms = require('./../models/tech_cms');
const collectionName = 'technology_cms';

exports.findCms = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let tech_cms = new TechCms(db);
  let page = req.params.page;
  tech_cms.getCms(page, function (err, tech_cms) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(tech_cms);
  });
};

exports.updateHeader = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let tech_cms = new TechCms(db);
  let page = req.params.page;
  tech_cms.editHeader(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateList = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let tech_cms = new TechCms(db);
  let page = req.params.page;
  tech_cms.editList(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateSlider = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let tech_cms = new TechCms(db);
  let page = req.params.page;
  tech_cms.editSlider(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.addSlider = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let tech_cms = new TechCms(db);
  let page = req.params.page;
  tech_cms.addPhoto(page, req, res, function (err, newPhoto) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newPhoto);
  });
}
