const mongo = require('./../lib/database_tech');
const TechRequest = require('./../models/tech');
const collectionName = 'technology_requests';

exports.getAllReq = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let techreq = new TechRequest(db);
  techreq.getAllRequests(function (err, reqs) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(reqs);
  });
};


exports.addRequest = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let techreq = new TechRequest(db);
  let techId = req.params.techId;
  techreq.addRequest(techId, req.body, function (err, newRequest) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newRequest);
  });
};

exports.changeStatus = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let comment = new TechRequest(db);
  let requestId = req.params.requestId;
  comment.changeStatus(requestId, req.body, function (err, request) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(request);
  });
};
