const fs = require('fs');

exports.deleteFile = function (path) {
  fs.unlink(path, function (err) {
    if(err) console.error(err);
  });
}

exports.renameFile = function (oldName, newName) {
  fs.rename(oldName, newName, function (err) {
    if(err) console.error(err);
  });
}

exports.createUploadDirectory = function (id) {
  if (!fs.existsSync('public/uploads'))
    fs.mkdirSync('public/uploads');
  if (!fs.existsSync('public/uploads/'+id))
    fs.mkdirSync('public/uploads/'+id);

  if (!fs.existsSync('public/uploads/'+id+'/360'))
    fs.mkdirSync('public/uploads/'+id+'/360');
  if (!fs.existsSync('public/uploads/'+id+'/awards'))
    fs.mkdirSync('public/uploads/'+id+'/awards');
  if (!fs.existsSync('public/uploads/'+id+'/photos'))
    fs.mkdirSync('public/uploads/'+id+'/photos');
  if (!fs.existsSync('public/uploads/'+id+'/posters'))
    fs.mkdirSync('public/uploads/'+id+'/posters');
  if (!fs.existsSync('public/uploads/'+id+'/technologies'))
    fs.mkdirSync('public/uploads/'+id+'/technologies');
  if (!fs.existsSync('public/uploads/'+id+'/blogs'))
    fs.mkdirSync('public/uploads/'+id+'/blogs');
  if (!fs.existsSync('public/uploads/'+id+'/profiles'))
    fs.mkdirSync('public/uploads/'+id+'/profiles');
  if (!fs.existsSync('public/uploads/'+id+'/events'))
    fs.mkdirSync('public/uploads/'+id+'/events');
};
