'use strict';
const mongo = require('./../lib/database');
const Admin = require('./../models/admin');
const collectionName = 'fiesta_admin';

/**********************************************
* Functions for the Fiesta Admin API
**********************************************/
exports.authenticate = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let admin = new Admin(db);
  let email = req.body.email;
  let password = req.body.password;

  admin.authenticate(email, password, function (err, response) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      res.status(200).send(response);
    }
  });
};

exports.forgotPassword = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.forgotPassword(req.body.email, function (err, newAdmin) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      // send in email
      const nodemailer = require('nodemailer');
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'fiesta.pcaarrd.dost@gmail.com',
              pass: 'd0stpc44rdf13st4'
          }
      });

      let loginLink = 'http://128.199.166.120:3000/login';
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"DOST-PCAARRD Fiesta" <fiesta.pcaarrd.dost@gmail.com>', // sender address
          to: newAdmin.email, // list of receivers
          subject: 'New password for your account (DOST-PCAARRD Fiesta)', // Subject line
          html: '<p>Hello <strong>'+newAdmin.name+'</strong>,<br /><br />You may now login to the Fiesta website (DOST-PCAARRD) using this new password:<br /><br />Email: <a href="mailto:'+newAdmin.email+'">'+newAdmin.email+'</a><br />Password: '+newAdmin.exactPass+'<br /><br />You can click the link below or paste it in your browser<br /><strong>Link</strong>:&nbsp;'+loginLink+'<br /><br /><em>Please do not reply on this email</em>.<br /><strong><em>It is highly recommended to change your password after logging in.</em></strong><br />Thank you, have a good day!</p>'
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              res.status(520).send('Unable to send the email!');
              return;
          }
          res.status(200).send(newAdmin);
      });
    }
  });
};

exports.addAdmin = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.addAdmin(req.body, function (err, newAdmin) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      // send in email
      const nodemailer = require('nodemailer');
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'fiesta.pcaarrd.dost@gmail.com',
              pass: 'd0stpc44rdf13st4'
          }
      });

      let loginLink = 'http://128.199.166.120:3000/login';
      // setup email data with unicode symbols
      let mailOptions = {
          from: '"DOST-PCAARRD Fiesta" <fiesta.pcaarrd.dost@gmail.com>', // sender address
          to: newAdmin.email, // list of receivers
          subject: 'Account Credentials for Admin (DOST-PCAARRD Fiesta)', // Subject line
          html: '<p>Hello <strong>'+newAdmin.name+'</strong>,<br /><br />You may now login to the Fiesta website (DOST-PCAARRD) using these credentials:<br /><br />Email: <a href="mailto:'+newAdmin.email+'">'+newAdmin.email+'</a><br />Password: '+newAdmin.exactPass+'<br /><br />You can click the link below or paste it in your browser<br /><strong>Link</strong>:&nbsp;'+loginLink+'<br /><br /><em>Please do not reply on this email</em>.<br /><strong><em>It is highly recommended to change your password after logging in.</em></strong><br />Thank you, have a good day!</p>'
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              res.status(520).send('Unable to send the email!');
              return;
          }
          res.status(200).send(newAdmin);
      });
    }
  });
};

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.getAdmins(function (err, response) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      res.status(200).send(response);
    }
  });
};

exports.editAdminName = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.editAdmin(req.adminId, req.body, 'name', function (err, response) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      res.status(200).send(response);
    }
  });
};

exports.editAdminEmail = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.editAdmin(req.adminId, req.body, 'email', function (err, response) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      res.status(200).send(response);
    }
  });
};

exports.editAdminLocation = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.editAdmin(req.adminId, req.body, 'location', function (err, response) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      res.status(200).send(response);
    }
  });
};

exports.editAdminPassword = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }
  let admin = new Admin(db);
  admin.editAdminPassword(req.adminId, req.body.oldPassword, req.body.newPassword, function (err, response) {
    if(err) {
      res.status(err.statusCode).send(err);
    }
    else {
      res.status(200).send(response);
    }
  });
};
