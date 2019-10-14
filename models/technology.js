'use strict';
const ObjectId = require('./../lib/database').ObjectID;
const upload = require('./../utils/upload');
const File = require('./../utils/utils');

/*
  Technology Model
*/
function Technology(db) {
  this.db = db;
}

Technology.prototype.getTechnologies = function (fiestaId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
  };

  this.db.find(query).toArray(function (err, technologies) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, technologies);
  });
};

Technology.prototype.getTechnology = function (fiestaId, technologyId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(technologyId),
  };
  this.db.findOne(query, function (err, technology) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!technology)
      return callback({
        statusCode: 404,
        message: 'Technology with ID ['+technologyId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, technology);
  });
};

Technology.prototype.addTechnology = function (fiestaId, req, res, callback) {
  let db = this.db;
  let uploadImage = upload.getUploadFunction('technology'+new Date(), upload.TECHNOLOGY);
  uploadImage(req, res, function (err) {
    if (err || !req.file) {
      let message = '';
      if(err && err.code == 'LIMIT_UNEXPECTED_FILE')
        message = 'Wrong key for photo in form-data!';
      else if(!req.file && req.invalidPhoto)
        message = 'Only JPG, JPEG, and PNG files are allowed!';
      else if(!req.file)
        message = 'No photo uploaded!';
      return callback({
        statusCode: 422,
        message: message,
        error: err || new Error(message)
      });
    }
    else if(req.file) {

      if(!req.body.credits || req.body.credits.trim() == '' || !req.body.name || req.body.name.trim() == ''
        || !req.body.commodity || req.body.commodity.trim() == '' || !req.body.description || req.body.description.trim() == ''){
        File.deleteFile(req.file.path);
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for inserting technology!',
          error: new Error('Invalid paramaters for inserting technology!')
        }, null);
      }

      let newTechnology = {
        'fiestaId': new ObjectId(fiestaId),
        'image': {
            path: '',
            credits: req.body.credits
          },
        'name': req.body.name,
        'commodity': req.body.commodity,
        'description': req.body.description,
        'benefits': (req.body.benefits==null)? []:req.body.benefits,
        'partnerInstitutions': (req.body.partnerInstitutions==null)? []:req.body.partnerInstitutions,
        'targetBeneficiaries': (req.body.targetBeneficiaries==null)? []:req.body.targetBeneficiaries,
        'locations': (req.body.locations==null)? []:req.body.locations
      };
      if(!Array.isArray(newTechnology.benefits))
        newTechnology.benefits = [newTechnology.benefits.toString()];
      if(!Array.isArray(newTechnology.partnerInstitutions))
        newTechnology.partnerInstitutions = [newTechnology.partnerInstitutions.toString()];
      if(!Array.isArray(newTechnology.targetBeneficiaries))
        newTechnology.targetBeneficiaries = [newTechnology.targetBeneficiaries.toString()];
      if(!Array.isArray(newTechnology.locations))
        newTechnology.locations = [newTechnology.locations.toString()];

      db.insertOne(newTechnology, function (err, response) {
        if (err){
          File.deleteFile(req.file.path);
          return callback({
            statusCode: 500,
            message: err.toString(),
            error: err
          }, null);
        }
        else if(!(response && (response.insertedCount == 1) && response.insertedId)){
          File.deleteFile(req.file.path);
          return callback({
            statusCode: 520,
            message: 'Unknown error!',
            error: 'Unknown error!'
          }, null);
        }
        else{
          // rename file
          let oldPath = req.file.path.split('/');
          let filename = oldPath[oldPath.length-1].split('.');
          filename[0] = response.ops[0]._id+Date.now();
          filename = filename.join('.');
          oldPath[oldPath.length-1] = filename;
          let newPath = oldPath.join('/');

          let update = {
            $set: {
              'image.path': newPath.replace('public/', '')
            }
          };
          let query = {'_id': response.ops[0]._id, fiestaId: response.ops[0].fiestaId};
          let options = {new: true};
          db.findAndModify(query, [], update, options, function (err2, response2) {
              if (err2){
                return callback({
                  statusCode: 500,
                  message: err2.toString(),
                  error: err2
                }, null);
              }
              else if(!(response2 && response2.lastErrorObject.updatedExisting)){
                return callback({
                  statusCode: 520,
                  message: 'Unknown error!',
                  error: 'Unknown error!'
                }, null);
              }
              else{
                File.renameFile(req.file.path, newPath);
                return callback(null, response2.value);
              }
            });
        }
      });
    }
    else {
      return callback({
        statusCode: 520,
        message: 'No file was found!',
        error: new Error('No file was found!')
      }, null);
    }
  });
};

Technology.prototype.editDetails = function (fiestaId, technologyId, data, callback) {
  if(!data.credits || data.credits.trim() == '' || !data.name || data.name.trim() == ''
    || !data.commodity || data.commodity.trim() == '' || !data.description || data.description.trim() == ''
    || !Array.isArray(data.benefits) || !Array.isArray(data.partnerInstitutions)
    || !Array.isArray(data.targetBeneficiaries) || !Array.isArray(data.locations)){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating technology!',
      error: new Error('Invalid paramaters for updating technology!')
    }, null);
  }
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(technologyId)
  };

  var details = {};
  if(data.credits)
    details['image.credits'] = data.credits;
  if(data.name)
    details['name'] = data.name;
  if(data.description)
    details['description'] = data.description;
  if(data.commodity)
    details['commodity'] = data.commodity;
  if(data.benefits)
    details['benefits'] = data.benefits;
  if(data.locations)
    details['locations'] = data.locations;
  if(data.targetBeneficiaries)
      details['targetBeneficiaries'] = data.targetBeneficiaries;
  if(data.partnerInstitutions)
      details['partnerInstitutions'] = data.partnerInstitutions;

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
        message: 'Technology with ID ['+technologyId+'] is not found',
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

Technology.prototype.editImage = function (fiestaId, technologyId, req, res, callback) {
  let db = this.db;
  this.getTechnology(fiestaId, technologyId, function (err, technology) {
    if (err)
      return callback(err, null);
    else{
      let updateImage = upload.getUploadFunction(technologyId, upload.TECHNOLOGY);
      updateImage(req, res, function (err) {
        if (err || !req.file) {
          let message = '';
          if(err && err.code == 'LIMIT_UNEXPECTED_FILE')
            message = 'Wrong key for photo in form-data!';
          else if(!req.file && req.invalidPhoto)
            message = 'Only JPG, JPEG, and PNG files are allowed!';
          else if(!req.file)
            message = 'No photo uploaded!';
          return callback({
            statusCode: 422,
            message: message,
            error: err || new Error(message)
          });
        }
        else if (req.file) {
          let query = {
            'fiestaId': new ObjectId(fiestaId),
            '_id': new ObjectId(technologyId)
          };
          let updates = {
            '$set': {
              'image.path': req.file.path.replace('public/', '').trim()
            }
          };
          let options = {new: true};
          db.findAndModify(query, [], updates, options, function (err, response) {
            if (err)
              return callback({
                statusCode: 500,
                message: err.toString(),
                error: err
              }, null);
            else if(response && !response.lastErrorObject.updatedExisting){
              return callback({
                statusCode: 404,
                message: 'Technology ID ['+fiestaId+'] is not found!',
                error: new Error('Technology ID ['+fiestaId+'] is not found!')
              }, null);
            }
            else if (!response){
              return callback({
                statusCode: 520,
                message: 'Unknown error',
                error: new Error('Unknown error')
              }, null);
            }
            else{
              File.deleteFile('public/'+technology.image.path);
              return callback(null, response.value);
            }
          });
        }
        else {
          return callback({
            statusCode: 520,
            message: 'No file was found!',
            error: new Error('No file was found!')
          }, null);
        }
      });
    }
  });
};

Technology.prototype.removeTechnology = function (fiestaId, technologyId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(technologyId),
  };
  let option = {'remove':true};
  this.db.findAndModify(query, [], {}, option, function (err, response) {
      if (err)
        return callback({
          statusCode: 500,
          message: err.toString(),
          error: err
        }, null);
      else if ((response && response.ok == 1)){
        if(response.value){
          File.deleteFile('public/' + response.value.image.path);
          return callback(null, {success: true, message: 'Successfully removed technology!'});
        }
      }
      else
      return callback({
        statusCode: 404,
        message: 'Technology with ID ['+technologyId+'] is not found',
        error: err
      }, null);
    });
};

Technology.prototype.getLocations = function (callback) {
  this.db.distinct('locations', function (err, locations) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, locations);
  });
};

Technology.prototype.getPartnerInstitutions = function (callback) {
  this.db.distinct('partnerInstitutions', function (err, partnerInstitutions) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, partnerInstitutions);
  });
};

Technology.prototype.getBeneficiaries = function (callback) {
  this.db.distinct('targetBeneficiaries', function (err, targetBeneficiaries) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, targetBeneficiaries);
  });
};


module.exports = Technology;
