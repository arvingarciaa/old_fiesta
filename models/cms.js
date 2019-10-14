'use strict';
const upload = require('./../utils/upload');
const ObjectId = require('./../lib/database').ObjectID;
const File = require('./../utils/utils');

/*
  Cms Model
*/
function Cms(db) {
  this.db = db;
}

Cms.prototype.getCms = function (page, callback) {
  let query = {};
  if(page == 'fiesta') {
    query = {
      'page': page
    };
  } else {
    query = {
      'page': new ObjectId(page)
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

Cms.prototype.editTagline = function(page, data, callback) {
  let query = {
    'page': page
  };
  var details = {
    'tagline':data.tagline
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


Cms.prototype.editHeader = function(page, data, callback) {
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

Cms.prototype.editList = function(page, data, callback) {
  let query = {
    'page': page
  };
  var details = {
    'sort': {
      'show': data.sort.show,
      'options': {
        'title': data.sort.options.title,
        'date': data.sort.options.date,
        'consortium': data.sort.options.consortium
      }
    },
    'filter': {
      'show': data.filter.show,
      'options': {
        'consortium': data.filter.options.consortium,
        'region': data.filter.options.region,
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


Cms.prototype.editMagazine = function(page, data, callback) {
  let query = {
    'page': page
  };
  var details = {
    'pdf': {
      'show': data.pdf.show,
      'sort': {
        'option': data.pdf.sort.option,
        'order': data.pdf.sort.order == 'Descending'? true: false
      },
      'pagination': {
        'pageSize': 6,
        'currentPage': 1
      }
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

Cms.prototype.editCarouselFeature = function(page, data, callback) {
  let query = {
    'page': page
  };

  let updates = {'$set': {'carousel.fiesta': data}};
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

Cms.prototype.editBanner = function (page, req, res, callback) {
  let db = this.db;
  this.getCms(page, function (err, cmsSetting) {
    if (err)
      return callback(err, null);
    else{
      let updateBanner = upload.getUploadFunction('banner', upload.BANNER);
      updateBanner(req, res, function (err) {
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
              'banner': req.file.path.replace('public/', '').trim()
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
              if(cmsSetting[0].banner !== 'assets/user/images/fiesta/default/banner.png') {
                File.deleteFile('public/'+cmsSetting[0].banner);
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

Cms.prototype.editCarouselImage = function (page, req, res, callback) {
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

Cms.prototype.editLogo = function (page, req, res, callback) {
  let db = this.db;
  this.getCms(page, function (err, cmsSetting) {
    if (err)
      return callback(err, null);
    else{
      let updateLogo = upload.getUploadFunction('logo', upload.LOGO);
      updateLogo(req, res, function (err) {
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
              'logo': req.file.path.replace('public/', '').trim()
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
              if(cmsSetting[0].logo !== 'assets/user/images/fiesta/default/fiesta-logo.png') {
                File.deleteFile('public/'+cmsSetting[0].logo);
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

Cms.prototype.editFiestaTab = function(page, data, callback) {
  let query = {
    'page': new ObjectId(page)
  };
  var details = {
    'fiesta': {
      'execdir': {
        'default': data.fiesta.execdir.default,
        'director': data.fiesta.execdir.director,
        'message': data.fiesta.execdir.message,
        'download': data.fiesta.execdir.download
      },
      'about': data.fiesta.about,
      'react': data.fiesta.react,
      'comment': data.fiesta.comment
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

Cms.prototype.editExecDirImage = function (page, req, res, callback) {
  let db = this.db;
  this.getCms(page, function (err, cmsSetting) {
    if (err)
      return callback(err, null);
    else{
      let updateLogo = upload.getUploadFunction('logo', upload.LOGO);
      updateLogo(req, res, function (err) {
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
            'page': new ObjectId(page)
          };
          let updates = {
            '$set': {
              'fiesta.execdir.default': req.file.path.replace('public/', '').trim()
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
              // File.deleteFile('public/'+cmsSetting[0].logo);
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

Cms.prototype.editSchedOptions = function(page, data, callback) {
  let query = {
    'page': new ObjectId(page)
  };
  var details = {
    'schedule': {
      'sched': data.schedule.sched,
      'map': data.schedule.map,
      'googlemap': data.schedule.googlemap
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

Cms.prototype.editFtOptions = function(page, data, callback) {
  let query = {
    'page': new ObjectId(page)
  };
  var details = {
    'feattech': {
      'react': data.feattech.react,
      'comment': data.feattech.comment
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

Cms.prototype.editMediaOptions = function(page, data, callback) {
  let query = {
    'page': new ObjectId(page)
  };
  var details = {
    'media': {
      'photo': data.media.photo,
      'video': data.media.video
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


module.exports = Cms;
