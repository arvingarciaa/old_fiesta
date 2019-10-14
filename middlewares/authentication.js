const mongo = require('./../lib/database');
const jwt = require('jsonwebtoken');
const secretKey = require('./../config/config').secretKey;

/* Function for checking if fiesta exist in retrieving its subcomponents */
exports.checkFiesta = function (req, res, next){
  let db = mongo.getDb().collection('fiesta');
  let fiestaId = req.params.fiestaId;
  let parameter = {_id: new mongo.ObjectID(fiestaId)};

  db.findOne(parameter, function (err, fiesta) {
      if (err || !fiesta) {
        res.status(404).send({message:'Fiesta ['+fiestaId+'] is not found!'});
      }
      else{
        // proceed next callback
        next();
      }
    });
};
/* Function for checking if the id(s) in req parameter are valid */
exports.checkId = function (req, res, next){
  let params = req.params;
  let noInvalidIds = true;

  for (var id in params) {
    if(params.hasOwnProperty(id) && !mongo.ObjectID.isValid(params[id])){
      res.status(422).send({message:'Invalid '+id.replace('Id', ' id')+'!'});
      noInvalidIds = false;
      break;
    }
  }
  if(noInvalidIds)
    next();
};

/* Function for verifying valid tokens */
exports.checkToken = function (req, res, next) {
  let token = req.cookies.access_token || null;
  if(token){
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        let loginUrl = (err.name == 'TokenExpiredError')? '/login?session_expired=1':'/login?auth_failed=1';
        res.redirect(loginUrl);
      }
      else {
        let payload = jwt.decode(token);
        req.adminId = payload._id;
        next();
      }
    });
  }
  else {
    res.redirect('/login?session_expired=1');
  }
};
