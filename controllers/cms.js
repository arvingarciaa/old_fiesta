const mongo = require('./../lib/database');
const Cms = require('./../models/cms');
const collectionName = 'fiesta_cms';

exports.findCms = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.getCms(page, function (err, cms) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(cms);
  });
};

exports.updateHeader = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editHeader(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateTagline = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editTagline(page, req.body, function (err, updatedSettings) {
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

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editList(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateMagazine = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editMagazine(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};


exports.updateCarouselFeature = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editCarouselFeature(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};


exports.updateBanner = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editBanner(page, req, res, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateLogo = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editLogo(page, req, res, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateCarouselImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editCarouselImage(page, req, res, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateFiestaTab = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editFiestaTab(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateExecDirImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editExecDirImage(page, req, res, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateSchedOptions = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editSchedOptions(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateFtOptions = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editFtOptions(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};

exports.updateMediaOptions = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let cms = new Cms(db);
  let page = req.params.page;
  cms.editMediaOptions(page, req.body, function (err, updatedSettings) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedSettings);
  });
};
