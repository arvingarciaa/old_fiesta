'use strict';
const upload = require('./../utils/upload');
const ObjectId = require('./../lib/database_tech').ObjectID;
const File = require('./../utils/utils');

/*
  Cms Model
*/
function TechCms(db) {
  this.db = db;
}

TechCms.prototype.getCms = function (page, callback) {
  let query = {};
  if(page == 'technology') {
    query = {
      'page': page
    };
  }

  this.db.find(query).toArray(function (err, cms) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, cms);
  });
};

TechCms.prototype.editHeader = function(page, data, callback) {
  let query = {
    'page': page
  };
  var details = {
    'header':data.header
  };

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
        message: 'CMS with Page ['+page+'] is not found',
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

TechCms.prototype.editList = function(page, data, callback) {
  let query = {
    'page': page
  };
  var details = {
    'sort': {
      'show': data.sort.show,
      'options': {
        'title': data.sort.options.title,
        'industry': data.sort.options.industry,
        'year': data.sort.options.year,
        'commodity': data.sort.options.commodity
      }
    },
    'filter': {
      'show': data.filter.show,
      'options': {
        'industry': data.filter.options.industry,
        'year': data.filter.options.year,
        'commodity': data.filter.options.commodity
      }
    },
    'counter': data.counter,
    'cards': {
      'option': data.cards.option,
      'order': data.cards.order
    },
    'pagination': {
      'pageSize': data.pagination.pageSize,
      'currentPage': data.pagination.currentPage
    }
  };

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
        message: 'CMS with Page ['+page+'] is not found',
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

TechCms.prototype.editSlider = function(page, data, callback) {
  let query = {
    'page': page
  };
  var details = {
    'slider':data.slider
  };

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
        message: 'CMS with Page ['+page+'] is not found',
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

TechCms.prototype.addPhoto = function (page, req, res, callback) {
  let db = this.db;
  let addSliderImage = upload.getUploadFunction('slider-image', upload.SLIDER_IMAGE);
  addSliderImage(req, res, function (err) {
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
    // save
    else if (req.file) {
      return callback(null, req.file.path);
    }
    // no file
    else {
      return callback({
        statusCode: 520,
        message: 'No file was found!',
        error: new Error('No file was found!')
      }, null);
    }
  });

};

TechCms.prototype.editCarouselImage = function (page, req, res, callback) {
  let db = this.db;
  this.getCms(page, function (err, cmsSetting) {
    if (err)
      return callback(err, null);
    else{

      let updateCarouselImage = upload.getUploadFunction('carousel-image', upload.CAROUSEL_IMAGE);
      updateCarouselImage(req, res, function (err) {
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
            'page': page
          };
          let updates = {
            '$set': {
              'carousel.default': req.file.path.replace('public/', '').trim()
            }
          };
          let fields = {new: true};
          db.findAndModify(query, [], updates, fields, function (err, response) {
            if (err)
              return callback({
                statusCode: 500,
                message: err.toString(),
                error: err
              }, null);
            else if(response && !response.lastErrorObject.updatedExisting){
              return callback({
                statusCode: 404,
                message: 'Cms with page ['+page+'] is not found!',
                error: new Error('Cms with page ['+page+'] is not found!')
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
              if(cmsSetting[0].carousel.default !== 'assets/user/images/fiesta/default/fiesta-slider.png') {
                File.deleteFile('public/'+cmsSetting[0].carousel.default);
              }
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

TechCms.prototype.addRequest = function (techId, request, callback) {
  if(!request.techId || !request.title || !request.email ||
      request.techId.trim()=='' || request.title.trim()=='' || request.email.trim()==''){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting requests!',
      error: new Error('Invalid paramaters for inserting requests!')
    }, null);
  }

  let newRequest = {
    'techId': new ObjectId(techId),
    'title': request.title,
    'email': request.email
  };

  this.db.insertOne(newRequest, function (err, response) {
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


module.exports = TechCms;
