/*
In terminal:
  mongo localhost:27017/fiesta_db _mongodb/fiestas/sipag-ni-juan.js
*/
/***************************************
  SIPAG ni JUAN
***************************************/
var db = new Mongo().getDB('fiesta_db');


var dragonId = ObjectId();
var adminId = ObjectId('123456789012345678901234');

// Fiesta
db.fiesta.insertOne({
  _id: dragonId,
  _active: true,
  createdBy: adminId,

  title: 'WESMAARRDEC',
  description: '',
  startDate: new Date('November 22, 2016'),
  endDate: new Date('November 23, 2016'),
  venue: 'KCC Mall de Zamboanga City',
  region: 'Region XII',
  commodity: [
    'Chicken'
  ],
  consortium: 'WESMAARRDEC',
  consortiumFull: 'Western Minadanao Agriculture and Aquatic Resources Research and Development Consortium',
  vicinityMap: {path:'', credits:''},
  picture: {path:'assets/fiesta-logo.jpg', credits:''},
  coordinates: {lat:6.9208566, lng:122.0712121},

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
  page: dragonId,
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
