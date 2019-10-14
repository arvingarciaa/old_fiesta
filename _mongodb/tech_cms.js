/*
In terminal:
  mongo localhost:27017/technology_db _mongodb/tech_cms.js

*/
var db = new Mongo().getDB('technology_db');

db.technology_cms.drop();
db.technology_cms.insertOne({
  page: 'technology',
  header: 'Technology Transfer and Promotion',
  slider: ['/assets/user/images/technology/banner1.jpg',
  '/assets/user/images/technology/banner2.jpg'
  ],
  sort: {
    show: true,
    options: {
      title: true,
      industry: true,
      year: true,
      commodity: true
    }
  },
  filter: {
    show: true,
    options: {
      industry: true,
      year: true,
      commodity: true
    }
  },
  counter:true,
  cards: {
    option: 'title',
    order: false
  },
  pagination: {
    pageSize: 12,
    currentPage: 1
  },
});
