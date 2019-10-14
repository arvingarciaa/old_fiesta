/*
In terminal:
  mongo localhost:27017/fiesta_db _mongodb/_init.js
*/

/***************************************
  FIESTA DATABASE
***************************************/
var db = new Mongo().getDB('fiesta_db');

/****************************************
  Commodites
****************************************/
db.createCollection('sector');
var sectors = [
  { name: 'Forest and Environment', commodities: ['Bamboo', 'Industrial Tree Plantation', 'Cacao', 'Rubber']},
  { name: 'Livestock', commodities: ['Dairy Buffalo', 'Goat', 'Swine', 'Native Chicken', 'Duck']},
  { name: 'Aquatic', commodities: ['Sardines', 'Seaweed', 'Corals', 'Oyster', 'Sea Cucumber', 'Aquafeeds', 'Tilapia', 'Mud Crab', 'Mussel', 'Shrimp', 'Milkfish']},
  { name: 'Crops', commodities: ['Vegetables', 'Banana', 'Sweet Potato', 'Rice', 'Peanut', 'Mango', 'Jackfruit', 'Coconut', 'Cocosugar', 'Durian', 'Muscovado', 'Coffee', 'Abaca']}
];
db.sector.drop();
db.sector.insertMany(sectors);

// Fiesta Database Schema
db.createCollection('fiesta');
db.createCollection('fiesta_activity');
db.createCollection('fiesta_award');
db.createCollection('fiesta_blog');
db.createCollection('fiesta_event');
db.createCollection('fiesta_more');
db.createCollection('fiesta_photo');
db.createCollection('fiesta_poster');
db.createCollection('fiesta_profile');
db.createCollection('fiesta_featured_technology');
db.createCollection('fiesta_video');
db.createCollection('fiesta_reactions');
db.createCollection('fiesta_comments');
db.createCollection('fiesta_cms');

/***************************************

Uncomment if you want to add data

***************************************/
load('_mongodb/all_fiesta.js');
load('_mongodb/cms.js');
load('_mongodb/admin.js');
