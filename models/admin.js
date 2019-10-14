'use strict';
const ObjectId = require('./../lib/database').ObjectID;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = require('./../config/config.js').secretKey;
/*
  Admin Model
*/
function Admin(db) {
  this.db = db;
}

Admin.prototype.authenticate = function (email, password, callback) {
  if(!email || !password || email.trim()==''|| password.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for authenticating admin!',
      error: new Error('No data submitted!')
    }, null);
  }

  let query = {
    'email': email.trim()
  };
  this.db.findOne(query, function (err, admin) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!admin)
      return callback({
        statusCode: 404,
        message: 'Admin with email ['+email+'] is not found',
        error: ''
      }, null);
    else if(!bcrypt.compareSync(password, admin.password)){
      return callback({
        statusCode: 404,
        message: 'Wrong combination of username and password!',
        error: ''
      }, null);
    }
    else {
      delete admin.password;
      let token = jwt.sign(admin, secretKey, {expiresIn: "2 days"});
      return callback(null, {success: true, admin: admin, token: token});
    }
  });
};

Admin.prototype.getAdmins = function (callback) {
  this.db.find({}, {password: false}).sort({name:1}).toArray(function (err, admins) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, admins);
  });
};

Admin.prototype.getAdmin = function (adminId, callback) {
  let query = {
    '_id': new ObjectId(adminId),
  };
  this.db.findOne(query, function (err, admin) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!admin)
      return callback({
        statusCode: 404,
        message: 'Admin is not found',
        error: err
      }, null);
    else
      return callback(null, admin);
  });
};

Admin.prototype.forgotPassword = function (email, callback) {
  if(!email || (email+'').trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating admin!',
      error: new Error('Invalid paramaters for updating admin!')
    }, null);
  }

  let exactTempPass = (require('crypto-random-string')(10)).toString();
  let hashTempPass = bcrypt.hashSync(exactTempPass, 10);
  let updatedAdmin = {
    password: hashTempPass
  };

  let query = {email: email};
  let updates = {'$set': updatedAdmin};
  let options = {'new': true};
  this.db.findAndModify(query, [], updates, options, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Admin is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else {
      response.value.exactPass = exactTempPass;
      return callback(null, response.value);
    }
  });
};

Admin.prototype.addAdmin = function (admin, callback) {
  if(!admin || admin.name=='' || admin.email=='' || admin.city=='' || admin.province=='' || admin.region==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating admin!',
      error: new Error('Invalid paramaters for updating admin!')
    }, null);
  }

  let exactTempPass = (require('crypto-random-string')(10)).toString();
  let hashTempPass = bcrypt.hashSync(exactTempPass, 10);
  let newAdmin = {
    name: admin.name,
    email: admin.email,
    city: admin.city,
    province: admin.province,
    region: admin.region,
    password: hashTempPass
  };
  this.db.insertOne(newAdmin, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!response || response.insertedCount != 1 || !response.insertedId)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else{
      response.ops[0].exactPass = exactTempPass;
      return callback(null, response.ops[0]);
    }
  });
};

Admin.prototype.editAdmin = function (adminId, data, field, callback) {
  if(!data){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating admin!',
      error: new Error('Invalid paramaters for updating admin!')
    }, null);
  }
  let query = {
    '_id': new ObjectId(adminId)
  };
  var details = {};

  if(field == 'name'){
    details.name = (data.name+'').trim();
  }
  else if(field == 'email'){
    details.email = (data.email+'').trim();
  }
  else if(field == 'location'){
    details.city = (data.city+'').trim();
    details.province = (data.province+'').trim();
    details.region = (data.region+'').trim();
  }

  let updates = {'$set': details};
  let options = {'new': true};
  this.db.findAndModify(query, [], updates, options, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Admin is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else {
      return callback(null, response.value);
    }
  });
};

Admin.prototype.editAdminPassword = function (adminId, oldPassword, newPassword, callback) {
  if(!oldPassword || !newPassword || oldPassword.trim()==''|| newPassword.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating password!',
      error: new Error('No data submitted!')
    }, null);
  }

  let query = {
    '_id': new ObjectId(adminId)
  };
  let db = this.db;
  this.db.findOne(query, function (err, admin) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!admin)
      return callback({
        statusCode: 404,
        message: 'Admin is not found',
        error: ''
      }, null);
    else if(!bcrypt.compareSync(oldPassword, admin.password)){
      return callback({
        statusCode: 404,
        message: 'Password is incorrect!',
        error: ''
      }, null);
    }
    else {
      let newPass = (newPassword+'').trim();
      let hashPass = bcrypt.hashSync(newPass, 10);
      let updates = {'$set': {
        password: hashPass
      }};
      db.findAndModify(query, [], updates, {}, function (err, response) {
        if (err)
          return callback({
            statusCode: 500,
            message: err.toString(),
            error: err
          }, null);
        else if(response && !response.lastErrorObject.updatedExisting)
          return callback({
            statusCode: 404,
            message: 'Admin is not found',
            error: err
          }, null);
        else if (!response)
          return callback({
            statusCode: 520,
            message: 'Unknown error',
            error: err
          }, null);
        else {
          return callback(null, response.value);
        }
      });
    }
  });
};

Admin.prototype.removeAdmin = function (adminId, callback) {
  let query = {
    '_id': new ObjectId(adminId)
  };
  this.db.remove(query, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (response && (response.result.n!=1))
      return callback({
        statusCode: 404,
        message: 'Admin is not found',
        error: err
      }, null);
    else if(!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      return callback(null, {success: true, message: 'Successfully removed admin!'});
  });
};

module.exports = Admin;
