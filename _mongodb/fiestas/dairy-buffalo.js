/*
In terminal:
  mongo localhost:27017/fiesta_db _mongodb/fiestas/dairy_buffalo.js
*/
/***************************************
  Dairy Buffalo Fiesta
***************************************/
var db = new Mongo().getDB('fiesta_db');


var dairyId = ObjectId();
var adminId = ObjectId('123456789012345678901234');

// Fiesta
db.fiesta.insertOne({
  _id: dairyId,
  _active: true,
  createdBy: adminId,

  title: 'Dairy Buffalo',
  description: '',
  startDate: new Date('March 25, 2015'),
  endDate: new Date('March 27, 2015'),
  venue: 'PCC, Munoz, Nueva Ecija',
  region: 'Region III',
  commodity: [
    'Dairy Buffalo'
  ],
  consortium: 'CLARRDEC',
  consortiumFull: 'Central Luzon Agriculture and Resources Research and Development Consortium',
  vicinityMap: {path:'', credits:''},
  picture: {path:'assets/fiesta-logo.jpg', credits:''},
  coordinates: {lat:15.743517292543604, lng:120.9380229949951},

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
  page: dairyId,
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
