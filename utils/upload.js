const path = require('path');
const multer = require('multer');
const utils = require('./utils');

module.exports = {
  _360: '360',
  AWARD: 'award',
  PHOTO: 'photo',
  POSTER: 'poster',
  TECHNOLOGY: 'technology',
  BLOG: 'blog',
  PROFILE: 'profile',
  EVENT: 'event',
  VICINITY_MAP: 'vicinity-map',
  PICTURE: 'picture',
  EXECUTIVE: 'executive',
  EDITORIAL: 'editorial',
  INFOCUS: 'infocus',
  FIESTAVAL: 'fiestaval',
  MAGAZINE: 'magazine',

  BANNER: 'banner',
  CAROUSEL_IMAGE: 'carousel-image',
  LOGO: 'logo',
  SLIDER_IMAGE: 'slider-image',
  getUploadFunction: getUploadFunction
};


function getUploadFunction(filename, mode){
  let destPath = '';
  switch (mode) {
    case '360':
      destPath = '/360';
      break;
    case 'award':
      destPath = '/awards';
      break;
    case 'photo':
      destPath = '/photos';
      break;
    case 'poster':
      destPath = '/posters';
      break;
    case 'technology':
      destPath = '/technologies';
      break;
    case 'blog':
      destPath = '/blogs';
      break;
    case 'profile':
      destPath = '/profiles';
      break;
    case 'event':
      destPath = '/events';
      break;
}

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(req.params.fiestaId) utils.createUploadDirectory(req.params.fiestaId);
      if(mode=='banner' || mode=='carousel-image' || mode=='logo'){
        cb(null, 'public/assets/user/images/fiesta');
      }
      else if(mode=='slider-image') {
        cb(null, 'public/assets/user/images/technology');
      }
      else{
        cb(null, 'public/uploads/'+req.params.fiestaId+destPath);
      }
    },
    filename: function (req, file, cb) {
      let ext = file.mimetype.split('/');
      ext = ext[ext.length-1];
      cb(null, filename+Date.now()+'.'+ext);
    }
  });

  let fileChecker = function (req, file, callback) {
    if(file){
      let filetypes = /jpeg|jpg|png/;
      if(mode == 'magazine') filetypes = /pdf/;
      let mimetype = filetypes.test(file.mimetype);
      let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return callback(null, true);
      }
      else{
        req.invalidPhoto = true;
        callback(null, false);
      }
    } else{
      callback(null, false);
    }
  };

  let upload;
  if(mode == 'magazine') upload = multer({storage: storage, fileFilter: fileChecker}).single('magazine-'+mode);
  else upload = multer({storage: storage, fileFilter: fileChecker}).single('photo-'+mode);
  return upload;
}
