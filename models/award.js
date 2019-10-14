'use strict';
const ObjectId = require('./../lib/database').ObjectID;
const upload = require('./../utils/upload');
const File = require('./../utils/utils');

/*
  Award Model
*/
function Award(db) {
  this.db = db;
}

Award.prototype.getAwards = function (fiestaId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
  };

  this.db.find(query).toArray(function (err, awards) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, awards);
  });
};

Award.prototype.getAward = function (fiestaId, awardId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(awardId),
  };
  this.db.findOne(query, function (err, award) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!award)
      return callback({
        statusCode: 404,
        message: 'Award with ID ['+awardId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, award);
  });
};

Award.prototype.addAward = function (fiestaId, req, res, callback) {
  let db = this.db;
  let uploadImage = upload.getUploadFunction('award'+new Date(), upload.AWARD);
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

      if(!req.body.credits || req.body.credits.trim() == ''){
        File.deleteFile(req.file.path);
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for inserting award!',
          error: new Error('Invalid paramaters for inserting award!')
        }, null);
      }

      let newAward = {
        'fiestaId': new ObjectId(fiestaId),
        'image': {
          path: '',
          credits: req.body.credits.trim()
        },
        tags: req.body.tags || []
      };
      if(!Array.isArray(newAward.tags))
        newAward.tags = [newAward.tags.toString()];

      db.insertOne(newAward, function (err, response) {
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

Award.prototype.editDetails = function (fiestaId, awardId, data, callback) {
  if(!data.credits || data.credits.trim()=='' || (data.tags && !Array.isArray(data.tags))){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating award!',
      error: new Error('Invalid paramaters for updating award!')
    }, null);
  }
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(awardId)
  };

  var details = {};
  if(data.credits)
    details['image.credits'] = data.credits;
  if(data.tags)
    details['tags'] = data.tags;

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
        message: 'Award with ID ['+awardId+'] is not found',
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

Award.prototype.editImage = function (fiestaId, awardId, req, res, callback) {
  let db = this.db;
  this.getAward(fiestaId, awardId, function (err, award) {
    if (err)
      return callback(err, null);
    else{
      let updateImage = upload.getUploadFunction(awardId, upload.AWARD);
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
            '_id': new ObjectId(awardId)
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
                message: 'Award ID ['+fiestaId+'] is not found!',
                error: new Error('Award ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+award.image.path);
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

Award.prototype.removeAward = function (fiestaId, awardId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(awardId),
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
          return callback(null, {success: true, message: 'Successfully removed award!'});
        }
      }
      else
      return callback({
        statusCode: 404,
        message: 'Award with ID ['+awardId+'] is not found',
        error: err
      }, null);
    });
};

module.exports = Award;
