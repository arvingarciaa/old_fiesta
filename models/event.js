'use strict';
const ObjectId = require('./../lib/database').ObjectID;
const upload = require('./../utils/upload');
const File = require('./../utils/utils');

/*
  Event Model
*/
function Event(db) {
  this.db = db;
}

Event.prototype.getEvents = function (fiestaId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
  };

  this.db.find(query).toArray(function (err, events) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, events);
  });
};

Event.prototype.getEvent = function (fiestaId, eventId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(eventId),
  };
  this.db.findOne(query, function (err, event) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!event)
      return callback({
        statusCode: 404,
        message: 'Event with ID ['+eventId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, event);
  });
};

Event.prototype.addEvent = function (fiestaId, req, res, callback) {
  let db = this.db;
  let uploadImage = upload.getUploadFunction('event'+new Date(), upload.EVENT);
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

      if(!req.body.title || req.body.title.trim()=='' || !req.body.type || req.body.type.trim()=='' || !req.body.authors
      || !req.body.body || req.body.body.trim()=='' || !req.body.credits || req.body.credits.trim()==''){
        File.deleteFile(req.file.path);
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for inserting event!',
          error: new Error('Invalid paramaters for inserting event!')
        }, null);
      }

      let newEvent = {
        'fiestaId': new ObjectId(fiestaId),
        'image': {
          path: '',
          credits: req.body.credits.trim()
        },
        'title': req.body.title.trim(),
        'type': req.body.type.trim(),
        'authors': req.body.authors || [],
        'body': req.body.body.trim(),
        'timestamp': (req.body.timestamp)? new Date(req.body.timestamp):new Date(),
        'tags': req.body.tags || []
      };

      if(!Array.isArray(newEvent.tags))
        newEvent.tags = [newEvent.tags.toString()];
      if(!Array.isArray(newEvent.authors))
        newEvent.authors = [newEvent.authors.toString()];

      for (var i = 0; i < newEvent.authors.length; i++) {
        newEvent.authors[i] = JSON.parse(newEvent.authors[i]);
      }

      db.insertOne(newEvent, function (err, response) {
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

Event.prototype.editDetails = function (fiestaId, eventId, data, callback) {
  if(!data.credits || data.credits.trim()=='' || (data.tags && !Array.isArray(data.tags))){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating event!',
      error: new Error('Invalid paramaters for updating event!')
    }, null);
  }
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(eventId)
  };

  var details = {};

  if(data.title)
    details.title = data.title;
  if(data.type)
    details.type = data.type;
  if(data.authors)
    details.authors = data.authors || [];
  if(data.body)
    details.body = data.body;
  if(data.credits)
    details['image.credits'] = data.credits;
  if(data.tags)
    details.tags = data.tags;
  details.timestamp = (data.timestamp)? new Date(data.timestamp):new Date();

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
        message: 'Event with ID ['+eventId+'] is not found',
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

Event.prototype.editImage = function (fiestaId, eventId, req, res, callback) {
  let db = this.db;
  this.getEvent(fiestaId, eventId, function (err, event) {
    if (err)
      return callback(err, null);
    else{
      let updateImage = upload.getUploadFunction(eventId, upload.EVENT);
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
            '_id': new ObjectId(eventId)
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
                message: 'Event ID ['+fiestaId+'] is not found!',
                error: new Error('Event ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+event.image.path);
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

Event.prototype.removeEvent = function (fiestaId, eventId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(eventId),
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
          return callback(null, {success: true, message: 'Successfully removed event!'});
        }
      }
      else
      return callback({
        statusCode: 404,
        message: 'Event with ID ['+eventId+'] is not found',
        error: err
      }, null);
    });
};

module.exports = Event;
