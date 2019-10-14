/*
In terminal:
  mongo localhost:27017/fiesta_db _mongodb/cms.js

*/
var db = new Mongo().getDB('fiesta_db');

db.fiesta_cms.insertOne({
  page: 'fiesta',
  banner: '/assets/user/images/fiesta/default/banner.png',
  header: 'Farms and Industry Encounter through the Science and Technology Agenda',
  carousel: {
    default: '/assets/user/images/fiesta/default/fiesta-slider.png',
    fiesta: db.fiesta.find({'_active': true, 'published':true, 'startDate':{'$lte':new Date()}, 'endDate':{'$lte':new Date()}}, {_id:1}).sort({'startDate': -1}).limit(5).toArray().map(function(u){ return u._id.str})
  },
  logo: '/assets/user/images/fiesta/default/fiesta-logo.png',
  tagline: 'Celebrate our Filipino culture while promoting Science and Technology through different events hosted by PCAARRD consortia.',
  sort: {
    show: true,
    options: {
      title: true,
      date: true,
      consortium: true
    }
  },
  filter: {
    show: true,
    options: {
      consortium: true,
      region: true,
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
  pdf: {
    show: true,
    sort: {
      option: 'title',
      order: false
    },
    pagination: {
      pageSize: 6,
      currentPage: 1
    }
  }
});
