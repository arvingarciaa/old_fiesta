'use strict';
const mongo = require('./../lib/database');
const Blog = require('./../models/blog');
const collectionName = 'fiesta_blog';

/**********************************************
* Functions for the Fiesta Blog API
**********************************************/

exports.findAll = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let blog = new Blog(db);
  let fiestaId = req.params.fiestaId;
  blog.getBlogs(fiestaId, function (err, blogs) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(blogs);
  });
};

exports.insert = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let blog = new Blog(db);
  let fiestaId = req.params.fiestaId;
  blog.addBlog(fiestaId, req, res, function (err, newBlog) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(newBlog);
  });
}

exports.findOne = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let blog = new Blog(db);
  let fiestaId = req.params.fiestaId;
  let blogId = req.params.blogId;
  blog.getBlog(fiestaId, blogId, function (err, foundBlog) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundBlog);
  });
}

exports.updateDetails = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let blog = new Blog(db);
  let fiestaId = req.params.fiestaId;
  let blogId = req.params.blogId;
  blog.editDetails(fiestaId, blogId, req.body, function (err, updatedBlog) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(updatedBlog);
  });
};

exports.updateImage = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let blog = new Blog(db);
  let fiestaId = req.params.fiestaId;
  let blogId = req.params.blogId;
  blog.editImage(fiestaId, blogId, req, res, function (err, foundBlog) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(foundBlog);
  });
};

exports.remove = function (req, res) {
  let db = mongo.getDb().collection(collectionName);
  if(!db){
    res.status(500).send({message: 'Database server is not online!'});
    return;
  }

  let blog = new Blog(db);
  let fiestaId = req.params.fiestaId;
  let blogId = req.params.blogId;
  blog.removeBlog(fiestaId, blogId, function (err, response) {
    if(err)
      res.status(err.statusCode).send(err);
    else
      res.status(200).send(response);
  });
};
