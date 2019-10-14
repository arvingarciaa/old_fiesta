'use strict';
const mongo = require('./../lib/database');
const ObjectId = require('./../lib/database').ObjectID;
const upload = require('./../utils/upload');
const File = require('./../utils/utils');

/*
  Fiesta Model
*/
function Fiesta(db) {
  this.db = db;
}

Fiesta.prototype.getAllFiestas = function (adminId, callback) {
  let query = {
    'createdBy': new ObjectId(adminId)
  };
  this.db.find(query).toArray(function (err, fiestas) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, fiestas);
  });
};

Fiesta.prototype.getFiestas = function (callback) {
  let query = {
    '_active': true,
    'published': true
  };
  let fields = {
    title: true,
    createdBy: true,
    description: true,
    picture: true,
    startDate: true,
    endDate: true,
    venue: true,
    region: true,
    commodity: true,
    consortium: true,
    consortiumFull: true,
    vicinityMap: true,
    coordinates: true,
    magazine: true,
  };

  this.db.find(query, fields).toArray(function (err, fiestas) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, fiestas);
  });
};

Fiesta.prototype.getFiestasByAdmin = function (adminId, callback) {
  let query = {
    'createdBy': new ObjectId(adminId),
    '_active': true
  };
  let fields = {
    title: true,
    createdBy: true,
    description: true,
    picture: true,
    startDate: true,
    endDate: true,
    venue: true,
    region: true,
    commodity: true,
    consortium: true,
    consortiumFull: true,
    vicinityMap: true,
    coordinates: true,
    magazine: true
  };

  this.db.find(query, fields).toArray(function (err, fiestas) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else
      return callback(null, fiestas);
  });
};

Fiesta.prototype.getLatestFiestas = function (count, callback) {
  if(isNaN(parseInt(count))){
    return callback({
      statusCode: 520,
      message: 'Wrong parameters! Must be numeric.',
      error: count.toString() + ' is not numeric!'
    }, null);
  }
  let limit = parseInt(count);
  let now = new Date();
  let query = {
    '_active': true,
    'startDate': {
      '$lte': now
    },
    'endDate': {
      '$gte': now
    }
  };
  let fields = {
    title: true,
    createdBy: true,
    description: true,
    picture: true,
    startDate: true,
    endDate: true,
    venue: true,
    region: true,
    commodity: true,
    consortium: true,
    consortiumFull: true,
    vicinityMap: true,
    coordinates: true,
  };
  let options = {
    'limit': limit
  };
  let db = this.db;
  // on-going fiestas
  db.find(query, fields, options).toArray(function (err, fiestas) {
    if (err)
      return callback({
        statusCode: 520,
        message: 'Error in converting to an array!',
        error: err
      }, null);
    else if(fiestas.length < limit){
      options.limit = limit - fiestas.length;
      options.sort = 'startDate';
      // upcoming fiestas
      db.find({'_active': true, 'startDate': {'$gte': now}}, fields, options).toArray(function (err2, fiestas2) {
        if (err2)
          return callback({
            statusCode: 520,
            message: 'Error in converting to an array!',
            error: err2
          }, null);
        else if(fiestas.length + fiestas2.length < limit) {
          options.limit = limit - (fiestas.length + fiestas2.length);
          options.sort = [['endDate', 'desc']];
          // recent archived fiestas
          db.find({'_active': true, 'endDate': {'$lte': now}}, fields, options).toArray(function (err3, fiestas3) {
            if (err3)
              return callback({
                statusCode: 520,
                message: 'Error in converting to an array!',
                error: err2
              }, null);
            else{
              return callback(null, fiestas.concat(fiestas2).concat(fiestas3));
            }
          });
        }
        else{
          return callback(null, fiestas.concat(fiestas2));
        }
      });
    }
    else{
      return callback(null, fiestas);
    }
  });
};

Fiesta.prototype.getFiesta = function (fiestaId, callback) {
  let query = {
    '_id': new ObjectId(fiestaId),
    '_active': true
  };
  let fields = {
    title: true,
    createdBy: true,
    description: true,
    picture: true,
    startDate: true,
    endDate: true,
    venue: true,
    region: true,
    commodity: true,
    consortium: true,
    consortiumFull: true,
    vicinityMap: true,
    coordinates: true,
    magazine: true,
    published: true
  };
  this.db.findOne(query, fields, function (err, fiesta) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!fiesta)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, fiesta);
  });
};

Fiesta.prototype.getFiestaByAdmin = function (adminId, fiestaId, callback) {
  let query = {
    'createdBy': new ObjectId(adminId),
    '_id': new ObjectId(fiestaId),
    '_active': true
  };
  let fields = {
    title: true,
    createdBy: true,
    description: true,
    picture: true,
    startDate: true,
    endDate: true,
    venue: true,
    region: true,
    commodity: true,
    consortium: true,
    consortiumFull: true,
    vicinityMap: true,
    coordinates: true,
    magazine: true,
    published: true,
  };
  this.db.findOne(query, fields, function (err, fiesta) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!fiesta)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, fiesta);
  });
};

Fiesta.prototype.getWriteUps = function (fiestaId, callback) {
  let query = {
    '_id': new ObjectId(fiestaId),
    '_active': true
  };
  let fields = {
    executive: true,
    editorial: true,
    infocus: true,
    fiestaval: true
  };
  console.log(fiestaId, callback);
  this.db.findOne(query, fields, function (err, fiesta) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if (!fiesta)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else
      return callback(null, fiesta);
  });
};

Fiesta.prototype.addFiesta = function (adminId, fiesta, callback) {
  if(!fiesta.title || !fiesta.startDate || !fiesta.endDate || fiesta.title.trim() == '' || fiesta.startDate > fiesta.endDate){
    return callback({
      statusCode: 422,
      message: 'Invalid paramaters for inserting fiesta!',
      error: new Error('Invalid paramaters for inserting fiesta!')
    }, null);
  }

  let newFiesta = {
    _active: true,
    title: fiesta.title.trim(),
    createdBy: new ObjectId(adminId),
    description: '',
    picture: {path:'/assets/fiesta-logo.jpg', credits: ''},
    startDate: new Date(fiesta.startDate),
    endDate: new Date(fiesta.endDate),
    venue: '',
    region: '',
    commodity: [],
    consortium: '',
    consortiumFull: '',
    vicinityMap: {path:'', credits: ''},
    coordinates: {lat: null, lng: null},
    executive: {
      image:{path:'', credits:''},
      title:'',
      authors:[],
      body:''
    },
    editorial: {
      image:{path:'', credits:''},
      timestamp: null,
      title:'',
      authors:[],
      body:''
    },
    infocus: {
      image:{path:'', credits:''},
      timestamp: null,
      title:'',
      authors:[],
      body:''
    },
    fiestaval: {
      image:{path:'', credits:''},
      timestamp: null,
      title:'',
      authors:[],
      body:''
    },
    magazine: '',
    published: false
  };
  this.db.insertOne(newFiesta, function (err, response) {
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
    else {
      mongo.getDb().collection('fiesta_cms').insertOne({
        page: ObjectId(response.ops[0]._id),
        fiesta: {
          execdir: {
            default: '/assets/user/images/specific-fiesta/default/director.png',
            director: 'Mr. Reynaldo Ebora',
            message: 'PCAARRD adopts “Farms and Industry Encounters through the Science and Technology Agenda,” or FIESTA, as a strategy to push the commercialization of regional S&T-based products to their target markets nationwide.',
            download: true
          },
          about: true,
          react: true,
          comment: true,
        },
        schedule: {
          sched: true,
          map: true,
          googlemap: true,
        },
        feattech: {
          react: true,
          comment: true
        },
        media: {
          photo: 12,
          video: 12
        },
        blogs: 12
      });
      return callback(null, response.ops[0]);
    }
  });
};

Fiesta.prototype.editAbout = function (adminId, fiestaId, data, callback) {
  let details = {};

  switch (data.subject) {
    case 'published':
      details.published = data.published;
      break;
    case 'title':
      if(typeof data.title != 'string' || data.title.trim() == ''){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.title = data.title.trim();
      break;

    case 'description':
      if(typeof data.description != 'string' || data.description.trim() == ''){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.description = data.description.trim();
      break;

    case 'date':
      if(!data.startDate || !data.endDate || new Date(data.startDate) > new Date(data.endDate)){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.startDate = new Date(data.startDate);
      details.endDate = new Date(data.endDate);
      break;

    case 'venue':
      if(typeof data.venue != 'string'|| data.venue.trim() == ''){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.venue = data.venue.trim();
      break;

    case 'region':
      if(typeof data.region != 'string' || data.region.trim() == ''){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.region = data.region.trim();
      break;

    case 'consortium':
      if(typeof data.consortium != 'string' || typeof data.consortiumFull != 'string' ||
        data.consortium.trim() == '' || data.consortiumFull.trim() == ''){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.consortium = data.consortium;
      details.consortiumFull = data.consortiumFull;
      break;

    case 'coordinates':
      if(isNaN(parseFloat(data.coordinates.lat)) || isNaN(parseFloat(data.coordinates.lng))){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.coordinates = {
        lat: parseFloat(data.coordinates.lat),
        lng: parseFloat(data.coordinates.lng)
      };
      break;

    case 'commodity':
      if(!Array.isArray(data.commodity)){
        return callback({
          statusCode: 422,
          message: 'Invalid paramaters for updating fiesta!',
          error: new Error('Invalid paramaters for updating fiesta!')
        }, null);
      }
      details.commodity = data.commodity;
      break;
  }

  let query = {
    'createdBy': new ObjectId(adminId),
    '_id': new ObjectId(fiestaId),
    '_active': true
  };
  let updates = {'$set': details};
  let fields = {'new': true};

  this.db.findAndModify(query, [], updates, fields, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else {
      let updated = {};
      if (details.title) updated.title = response.value.title;
      else if (details.region) updated.region = response.value.region;
      else if (details.coordinates) updated.coordinates = response.value.coordinates;
      else if (details.description) updated.description = response.value.description;
      else if (details.venue) updated.venue = response.value.venue;
      else if (details.commodity) updated.commodity = response.value.commodity;
      else if (details.startDate && details.endDate){
        updated.startDate = response.value.startDate;
        updated.endDate = response.value.endDate;
      }
      else if (details.consortium){
        updated.consortium = response.value.consortium;
        updated.consortiumFull = response.value.consortiumFull;
      }
      return callback(null, updated);
    }
  });
};

Fiesta.prototype.editWriteUp = function (adminId, fiestaId, type, data, callback) {
  let query = {
    'createdBy': new ObjectId(adminId),
    '_id': new ObjectId(fiestaId),
    '_active': true
  };

  let details = {};
  if(typeof data.title == "string")
    details[type+'.title'] = data.title.trim();
  if(typeof data.body == "string")
    details[type+'.body'] = data.body.trim();
  if(typeof data.credits == "string")
    details[type+'.image.credits'] = data.credits.trim();
  if(Array.isArray(data.authors))
    details[type+'.authors'] = data.authors;
  let updates = {'$set': details};
  let fields = {'new': true};

  this.db.findAndModify(query, [], updates, fields, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else
      return callback(null, response.value[type]);
  });
};

Fiesta.prototype.editWriteUpImage = function (adminId, fiestaId, type, req, res, callback) {
  let db = this.db;
  this.getWriteUps(fiestaId, function (err, fiesta) {
    if (err)
      callback(err, null);
    else{
      let updateVicinityMap = upload.getUploadFunction(type, upload[type.toUpperCase()]);
      updateVicinityMap(req, res, function (err) {
        if (err || !req.file) {
          let message = '';
          if(err && err.code == 'LIMIT_UNEXPECTED_FILE')
            message = 'Wrong key for '+type+' in form-data!';
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
            'createdBy': new ObjectId(adminId),
            '_id': new ObjectId(fiestaId),
            '_active': true
          };
          let object = {};
          object[type+'.image.path'] = req.file.path.replace('public/', '').trim();

          let updates = {
            '$set': object
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
                message: 'Fiesta with ID ['+fiestaId+'] is not found!',
                error: new Error('Fiesta with ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+fiesta[type].image.path);
              return callback(null, response.value[type]);
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

Fiesta.prototype.editVicinityMap = function (adminId, fiestaId, req, res, callback) {
  let db = this.db;
  this.getFiestaByAdmin(adminId, fiestaId, function (err, fiesta) {
    if (err)
      callback(err, null);
    else{
      let updateVicinityMap = upload.getUploadFunction('vicinity-map', upload.VICINITY_MAP);
      updateVicinityMap(req, res, function (err) {
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
            'createdBy': new ObjectId(adminId),
            '_id': new ObjectId(fiestaId),
            '_active': true
          };
          let updates = {
            '$set': {
              'vicinityMap.path': req.file.path.replace('public/', '').trim()
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
                message: 'Fiesta with ID ['+fiestaId+'] is not found!',
                error: new Error('Fiesta with ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+fiesta.vicinityMap.path);
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

Fiesta.prototype.editPicture = function (adminId, fiestaId, req, res, callback) {
  let db = this.db;
  this.getFiestaByAdmin(adminId, fiestaId, function (err, fiesta) {
    if (err)
      callback(err, null);
    else{
      let updatePicture = upload.getUploadFunction('picture', upload.PICTURE);
      updatePicture(req, res, function (err) {
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
            'createdBy': new ObjectId(adminId),
            '_id': new ObjectId(fiestaId),
            '_active': true
          };
          let updates = {
            '$set': {
              'picture.path': req.file.path.replace('public/', '').trim()
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
                message: 'Fiesta with ID ['+fiestaId+'] is not found!',
                error: new Error('Fiesta with ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+fiesta.picture.path);
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

Fiesta.prototype.editExecutivePicture = function (adminId, fiestaId, req, res, callback) {
  let db = this.db;
  this.getWriteUps(fiestaId, function (err, fiesta) {
    if (err)
      callback(err, null);
    else{
      let updateExecutivePicture = upload.getUploadFunction('executive', upload.EXECUTIVE);
      updateExecutivePicture(req, res, function (err) {
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
            'createdBy': new ObjectId(adminId),
            '_id': new ObjectId(fiestaId),
            '_active': true
          };
          let updates = {
            '$set': {
              'executive.image.path': req.file.path.replace('public/', '').trim()
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
                message: 'Fiesta with ID ['+fiestaId+'] is not found!',
                error: new Error('Fiesta with ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+fiesta.executive.image.path);
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

Fiesta.prototype.editMagazine = function (adminId, fiestaId, req, res, callback) {
  let db = this.db;
  this.getFiestaByAdmin(adminId, fiestaId, function (err, fiesta) {
    if (err)
      callback(err, null);
    else{
      let updateMagazine = upload.getUploadFunction('magazine', upload.MAGAZINE);
      updateMagazine(req, res, function (err) {
        if (err || !req.file) {
          let message = '';
          if(err && err.code == 'LIMIT_UNEXPECTED_FILE')
            message = 'Wrong key for magazine in form-data!';
          else if(!req.file && req.invalidPhoto)
            message = 'Only PDFfiles are allowed!';
          else if(!req.file)
            message = 'No pdf file uploaded!';
          return callback({
            statusCode: 422,
            message: message,
            error: err || new Error(message)
          });
        }
        else if (req.file) {
          let query = {
            'createdBy': new ObjectId(adminId),
            '_id': new ObjectId(fiestaId),
            '_active': true
          };
          let updates = {
            '$set': {
              'magazine': req.file.path.replace('public/', '').trim()
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
                message: 'Fiesta with ID ['+fiestaId+'] is not found!',
                error: new Error('Fiesta with ID ['+fiestaId+'] is not found!')
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
              File.deleteFile('public/'+fiesta.magazine);
              if(fiesta.magazine) File.deleteFile('public/'+fiesta.magazine.replace('.pdf', '-0.png'));
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

Fiesta.prototype.removeFiesta = function (adminId, fiestaId, callback) {
  let query = {
    'createdBy': new ObjectId(adminId),
    '_id': new ObjectId(fiestaId),
    '_active': true
  };
  let updates = {
    '$set': {
      '_active': false
    }
  };
  let fields = {'new': true};
  this.db.findAndModify(query, [], updates, fields, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else
      return callback(null, response.value._id);
  });
};

Fiesta.prototype.restoreFiesta = function (adminId, fiestaId, callback) {
  let query = {
    'createdBy': new ObjectId(adminId),
    '_id': new ObjectId(fiestaId),
    '_active': false
  };
  let updates = {
    '$set': {
      '_active': true
    }
  };
  let fields = {'new': true};
  this.db.findAndModify(query, [], updates, fields, function (err, response) {
    if (err)
      return callback({
        statusCode: 500,
        message: err.toString(),
        error: err
      }, null);
    else if(response && !response.lastErrorObject.updatedExisting)
      return callback({
        statusCode: 404,
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else if (!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: err
      }, null);
    else
      return callback(null, response.value._id);
  });
};

Fiesta.prototype.removeFiestaPermanently = function (adminId, fiestaId, callback) {
  let query = {
    'createdBy': new ObjectId(adminId),
    '_id': new ObjectId(fiestaId)
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
        message: 'Fiesta with ID ['+fiestaId+'] is not found',
        error: err
      }, null);
    else if(!response)
      return callback({
        statusCode: 520,
        message: 'Unknown error',
        error: 'Unknown error'
      }, null);
    else
      return callback(null, {success: true, message: 'Successfully removed fiesta!'});
  });
};

module.exports = Fiesta;
