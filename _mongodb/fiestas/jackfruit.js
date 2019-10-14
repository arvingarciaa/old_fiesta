/*
In terminal:
  mongo localhost:27017/fiesta_db _mongodb/fiestas/mango.js
*/
/***************************************
  Jackfruit Fiesta
***************************************/
var db = new Mongo().getDB('fiesta_db');


var mangoId = ObjectId();
var adminId = ObjectId('123456789012345678901234');

// Fiesta
db.fiesta.insertOne({
  _id: mangoId,
  _active: true,
  createdBy: adminId,

  title: 'Jackfruit',
  description: '',
  startDate: new Date('August 6, 2012'),
  endDate: new Date('August 7, 2012'),
  venue: 'VSU, Baybay, Visca, Leyte',
  region: 'Region VIII',
  commodity: [
    'Jackfruit'
  ],
  consortium: 'VICARP',
  consortiumFull: 'Visayas Agriculture Resources Program',
  vicinityMap: {path:'', credits:''},
  picture: {path:'assets/fiesta-logo.jpg', credits:''},
  coordinates: {lat:10.744397, lng:124.7898823},

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
  magazine: ''
});


db.fiesta_cms.insertOne({
  page: mangoId,
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
