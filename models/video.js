'use strict';
const ObjectId = require('./../lib/database').ObjectID;

/*
  Video Model
*/
function Video(db) {
  this.db = db;
}

Video.prototype.getVideos = function (fiestaId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
  };

  this.db.find(query).toArray(function (err, videos) {
    if (err)
      callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      callback(null, videos);
  });
};

Video.prototype.getVideo = function (fiestaId, videoId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(videoId),
  };
  this.db.findOne(query, function (err, video) {
    if (err)
      callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!video)
      callback({
        statusCode: 404,
        message: 'Video with ID ['+videoId+'] is not found',
        error: err
      }, null);
    else
      callback(null, video);
  });
};

Video.prototype.addVideo = function (fiestaId, video, callback) {
  if(!video.credits || !video.youtubeId || video.credits.trim()=='' || video.youtubeId.trim()=='' || !/[^"&?\/\s]{11}/.test(video.youtubeId)){
    callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting video!',
      error: new Error('Invalid paramaters for inserting video!')
    }, null);
    return;
  }

  let newVideo = {
      fiestaId: new ObjectId(fiestaId),
      'youtubeId': video.youtubeId,
      'credits': video.credits,
      'tags': video.tags || []
  };

  this.db.insertOne(newVideo, function (err, response) {
    if (err)
      callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!response || response.insertedCount != 1 || !response.insertedId)
      callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else
      callback(null, response.ops[0]);
  });
};

Video.prototype.editVideo = function (fiestaId, videoId, data, callback) {
  if(!data.credits || !data.youtubeId || data.credits.trim()=='' || data.youtubeId.trim()=='' || !/[^"&?\/\s]{11}/.test(data.youtubeId)){
    callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting video!',
      error: new Error('Invalid paramaters for inserting video!')
    }, null);
    return;
  }

  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(videoId),
  };

  let details = {};
  if(data.credits)
    details.credits = data.credits;
  if(data.youtubeId)
    details.youtubeId = data.youtubeId;
  if(data.tags)
    details.tags = data.tags || [];

  let updates = {'$set': details};
  let options = {'new': true};

  this.db.findAndModify(query, [], updates, options, function (err, response) {
    if (err)
      callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      callback({
        statusCode: 404,
        message: 'Video with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else if (!response)
      callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else {
      callback(null, response.value);
    }
  });
};

Video.prototype.removeVideo = function (fiestaId, videoId, callback) {
  let query = {
    'fiestaId': new ObjectId(fiestaId),
    '_id': new ObjectId(videoId),
  };
  this.db.remove(query, function (err, response) {
    if (err)
      callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (response && (response.result.n!=1))
      callback({
        statusCode: 404,
        message: 'Video with ID ['+videoId+'] is not found',
        error: err
      }, null);
    else if(!response)
      callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      callback(null, {success: true, message: 'Successfully removed video!'});
  });
};

module.exports = Video;
