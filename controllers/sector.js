const mongo = require('./../lib/database');
/**********************************************
* Functions for the Fiesta Activity API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb();
  if(db){
    db.collection('sector').find({}).toArray(function (error, array) {
        if (error) {
          res.status(503).send({message: error});
        }
        else{
          /* Successfully retrieved the list of activities */
          res.status(200).send(array);
        }
      });
  }
  else {
    res.status(500).send({message:'Database server is down!'});
  }
};

exports.findAllCommodities = function (req, res) {
  let db = mongo.getDb();
  if(db){
    db.collection('sector').find({}).toArray(function (error, array) {
        if (error) {
          res.status(503).send({message: error});
        }
        else{
          let commodities = [];
          for (var i = 0; i < array.length; i++) {
            commodities.push(...array[i].commodities);
          }
          /* Successfully retrieved the list of activities */
          res.status(200).send(commodities.sort());
        }
      });
  }
  else {
    res.status(500).send({message:'Database server is down!'});
  }
};

exports.insertCommodity = function (req, res) {
  let db = mongo.getDb();

  let pattern = (req.params.sector)? req.params.sector.trim():'';
  let sector = new RegExp(pattern, 'i');
  let commodity = (req.body.commodity)? req.body.commodity.trim():'';

  if(db && sector != '' && commodity != ''){
    db.collection('sector').findAndModify({'name':sector}, [], {'$addToSet': {'commodities': commodity}}, {new: true},  function (err, response) {
        if (err){
          res.status(520).send({message: err.toString()});
        }
        else if(response && response.lastErrorObject.updatedExisting){
          res.status(200).send(response.value);
        }
        else if(response && !response.lastErrorObject.updatedExisting){
          res.status(404).send({message:'Sector ['+sector+'] is not found!'});
        }
        else{
          res.status(520).send({message: 'Unknown error'});
        }
      });
  }
  else if (sector == '' || commodity == '') {
    res.status(422).send({message: 'Incomplete parameters for inserting activity!'});
  }
  else{
    res.status(500).send({message:'Database server is down!'});
  }
};

exports.findOneSector = function (req, res) {
  let db = mongo.getDb();
  let pattern = (req.params.sector)? req.params.sector.trim():'';
  let sector = new RegExp(pattern, 'i');

  if(db){
    db.collection('sector').findOne({'name': sector}, function (err, activity) {
        if (err){
          res.status(520).send({message: err.toString()});
        }
        else if (!activity) {
          res.status(404).send({message:'Fiesta activity ['+sector+'] is not found!'});
        }
        else{
          res.status(200).send(activity);
        }
      });
  }
  else{
    res.status(500).send({message:'Database server is down!'});
  }
};

exports.removeCommodity = function (req, res) {
  let db = mongo.getDb();

  let pattern = (req.params.sector)? req.params.sector.trim():'';
  let sector = new RegExp(pattern, 'i');
  let pattern2 = (req.params.commodity)? req.params.commodity.trim():'';
  let commodity = new RegExp(pattern2, 'i');

  if(db){
    db.collection('sector').findAndModify({'name':sector}, [], {'$pull': {'commodities': commodity}}, {new: true},  function (err, response) {
        if (err){
          res.status(520).send({message: err.toString()});
        }
        else if(response && response.lastErrorObject.updatedExisting){
          res.status(200).send(response.value);
        }
        else if(response && !response.lastErrorObject.updatedExisting){
          res.status(404).send({message:'Sector ['+sector+'] is not found!'});
        }
        else{
          res.status(520).send({message: 'Unknown error'});
        }
      });
  }
  else{
    res.status(500).send({message:'Database server is down!'});
  }
};
