'use strict';
const mongo = require('./../lib/database');
const Fiesta = require('./../models/fiesta');
const collectionName = 'fiesta';
const fs = require('fs');
const PDFImage = require("pdf-image").PDFImage;

/**********************************************
* Functions for the Fiesta API
**********************************************/

exports.findAllType = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  fiesta.getAllFiestas(adminId, function (err, fiestas) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(fiestas);
  });
};


exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  fiesta.getFiestas(function (err, fiestas) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(fiestas);
  });
};

exports.findAllByAdmin = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  fiesta.getFiestasByAdmin(adminId, function (err, fiestas) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(fiestas);
  });
};



exports.findLatest = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  fiesta.getLatestFiestas(req.params.count, function (err, fiestas) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(fiestas);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  fiesta.addFiesta(adminId, req.body, function (err, newFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newFiesta);
  });
};

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let fiestaId = req.params.fiestaId.trim();
  fiesta.getFiesta(fiestaId, function (err, foundFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundFiesta);
  });
};

exports.findOneByAdmin = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.getFiestaByAdmin(adminId, fiestaId, function (err, foundFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundFiesta);
  });
};

exports.findOneWriteUps = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  // let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.getWriteUps(fiestaId, function (err, writeUps) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(writeUps);
  });
};

exports.updateAbout = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editAbout(adminId, fiestaId, req.body, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updateExecutive = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUp(adminId, fiestaId, 'executive', req.body, function (err, updatedExecutive) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedExecutive);
  });
};

exports.updateEditorial = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUp(adminId, fiestaId, 'editorial', req.body, function (err, updatedEditorial) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedEditorial);
  });
};

exports.updateInfocus = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUp(adminId, fiestaId, 'infocus', req.body, function (err, updatedInfocus) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedInfocus);
  });
};

exports.updateFiestaval = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUp(adminId, fiestaId, 'fiestaval', req.body, function (err, updatedFiestaval) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiestaval);
  });
};

exports.updateEditorialPicture = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUpImage(adminId, fiestaId, 'editorial', req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updateInfocusPicture = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUpImage(adminId, fiestaId, 'infocus', req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updateFiestavalPicture = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editWriteUpImage(adminId, fiestaId, 'fiestaval', req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updateExecutivePicture = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editExecutivePicture(adminId, fiestaId, req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updateVicinityMap = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editVicinityMap(adminId, fiestaId, req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updatePicture = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editPicture(adminId, fiestaId, req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};

exports.updateMagazine = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.editMagazine(adminId, fiestaId, req, res, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else {
      const pdfImage = new PDFImage("public/"+updatedFiesta.magazine);
      pdfImage.convertPage(0).then(function (imagePath) {
        fs.existsSync("/public/"+fiestaId+"/pdfthumbnail.jpg"); // => true
      });
      res.status(200).send(updatedFiesta);
    }
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.removeFiesta(adminId, fiestaId, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};


exports.restore = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.restoreFiesta(adminId, fiestaId, function (err, updatedFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedFiesta);
  });
};


exports.removePermanently = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let fiesta = new Fiesta(db);
  let adminId = req.adminId;
  let fiestaId = req.params.fiestaId.trim();
  fiesta.removeFiestaPermanently(adminId, fiestaId, function (err, deleteFiesta) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(deleteFiesta);
  });
};
