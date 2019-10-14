/***************************************************
* Router for the app web interface
***************************************************/
const express = require('express');
const router = express.Router();
const mongo = require('./../../lib/database');
const ObjectID = mongo.ObjectID;

/* get home page */
router.get('/', function(req, res) {
  res.render('home', {title: 'PCAARRD - DPITC'});
});

router.get('/fiesta', function(req, res) {
  res.render('home', {title: 'DPITC - FIESTA'});
});

router.get('/technology', function(req, res) {
  res.render('home', {title: 'Technology Transfer and Promotion'});
});

router.get('/fiesta/:fiestaId', getFiestaName, function(req, res) {
  res.render('home', {title: req.fiestaTitle});
});

router.get('/fiesta/:fiestaId/:tabSlug', getFiestaName, function(req, res) {
  res.render('home', {title: req.fiestaTitle});
});

router.get('/admin', function(req, res) {
  res.render('home', {title: 'Admin'});
});

router.get('/login', function(req, res) {
  res.render('home', {title: 'Login'});
});

router.get('/logout', function(req, res) {
  res.render('home', {title: 'Login'});
});

router.get('/forgot-password', function(req, res) {
  res.render('home', {title: 'Forgot Password'});
});

router.get('/admin/accounts', function(req, res) {
  res.render('home', {title: 'Accounts'});
});

router.get('/admin/settings', function(req, res) {
  res.render('home', {title: 'Settings'});
});

router.get('/admin/analytics', function(req, res) {
  res.render('home', {title: 'Analytics'});
});

router.get('/admin/customize', function(req, res) {
  res.render('home', {title: 'Customize'});
});

router.get('/admin/customize/:fiesta', function(req, res) {
  res.render('home', {title: 'Customize - FIESTA Page'});
});

router.get('/admin/manage/:fiestaId', getFiestaName, function(req, res) {
  res.render('home', {title: 'Manage - ' + req.fiestaTitle});
});

router.get('/admin/analytics/:fiestaId', getFiestaName, function(req, res) {
  res.render('home', {title: 'Analytics - '+ req.fiestaTitle});
});

router.get('/admin/analytics/:fiestaId/:tabSlug', getFiestaName, function(req, res) {
  res.render('home', {title: 'Analytics - '+ req.fiestaTitle});
});

router.get('/lost', function(req, res) {
  res.render('home', {title: 'Page not found'});
});

/* get not found page */
router.get('/*', function(req, res) {
  res.render('home', {title: 'Page not found!'});
});

// Function for putting fiesta name in the req object
function getFiestaName(req, res, next){
  let db = mongo.getDb();
  let fiestaId = req.params.fiestaId;

  if(db){
    if(ObjectID.isValid(fiestaId)){
      let id = {'_id': new ObjectID(fiestaId)};
      db.collection('fiesta').findOne(id, function (err, fiesta) {
          if(err){
            res.status(520).send(err);
          } else if(!fiesta) {
            let url = '/lost?why=fiesta_not_found'+ ((req.url.startsWith('/admin'))? '&admin=true': '');
            res.redirect(url);
          } else {
            req.fiestaTitle = fiesta.title;
            next();
          }
        });
    }
    else{
      let url = '/lost?why=fiesta_not_found'+ ((req.url.startsWith('/admin'))? '&admin=true': '');
      res.redirect(url);
    }

  } else {
    res.status(500).send('Database server is down!');
  }
}

module.exports = router;
