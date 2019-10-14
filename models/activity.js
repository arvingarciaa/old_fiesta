'use strict';
const ObjectId = require('./../lib/database').ObjectID;

/*
  Activity Model
*/
function Activity(db) {
  this.db = db;
}

Activity.prototype.getActivities = function (fiestaId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
  };

  this.db.find(query).toArray(function (err, activities) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, activities);
  });
};

Activity.prototype.getActivity = function (fiestaId, activityId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(activityId),
  };
  this.db.findOne(query, function (err, activity) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!activity)
      return callback({
        statusCode: 404,
        message: 'Activity with ID ['+activityId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, activity);
  });
};

Activity.prototype.addActivity = function (fiestaId, activity, callback) {
  if(!activity.title || !activity.location || !activity.timestamp || activity.title.trim()==''
    || activity.location.trim()=='' || !Array.isArray(activity.subtitle) || !Array.isArray(activity.people)){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating activity!',
      error: new Error('Invalid paramaters for updating activity!')
    }, null);
  }

  let newActivity = {
      fiestaId: new ObjectId(fiestaId),
      title: activity.title.trim(),
      sector: activity.sector || "",
      location: activity.location.trim(),
      timestamp: new Date(activity.timestamp),
      subtitle: activity.subtitle || [],
      people: activity.people || []
  };
  this.db.insertOne(newActivity, function (err, response) {
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
    else
      return callback(null, response.ops[0]);
  });
};

Activity.prototype.editActivity = function (fiestaId, activityId, data, callback) {
  if(!data.title || !data.location || !data.timestamp || data.title.trim()==''
    || data.location.trim()=='' || !Array.isArray(data.subtitle) || !Array.isArray(data.people)){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for updating activity!',
      error: new Error('Invalid paramaters for updating activity!')
    }, null);
  }
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(activityId),
  };
  var details = {};

  if(data.timestamp)
    details.timestamp = new Date(data.timestamp);
  if(data.title)
    details.title = data.title;
  if(data.sector)
    details.sector = data.sector;
  if(data.location)
    details.location = data.location;
  if(data.subtitle)
    details.subtitle = data.subtitle || [];
  if(data.people)
    details.people = data.people || [];

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
        message: 'Activity with ID ['+fiestaId+'] is not found',
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

Activity.prototype.removeActivity = function (fiestaId, activityId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(activityId),
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
        message: 'Activity with ID ['+activityId+'] is not found',
        error: err
      }, null);
    else if(!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      return callback(null, {success: true, message: 'Successfully removed activity!'});
  });
};

module.exports = Activity;
