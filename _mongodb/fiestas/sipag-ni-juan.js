/*
In terminal:
  mongo localhost:27017/fiesta_db _mongodb/fiestas/sipag-ni-juan.js
*/
/***************************************
  SIPAG ni JUAN
***************************************/
var db = new Mongo().getDB('fiesta_db');


var sipagId = ObjectId();
var adminId = ObjectId('123456789012345678901234');

// Fiesta
db.fiesta.insertOne({
  _id: sipagId,
  _active: true,
  createdBy: adminId,

  title: 'Strategic	Industry	S&T	Programs	for	Agri-Aqua	Growth (SIPAG) ni Juan',
  description: 'Strategic Industry S&T Program for Agri-Aqua Growth (SIPAG) bolsters PCAARRD’s commitment to DOST Outcome One, which the Council pursues through its Industry Strategic S&T Program (ISP). SIPAG embodies not only the values of hard work to bring out the best in agriculture and aquatic research and development (R&D) but also the benefits that these efforts will bring to every Filipino, hence PCAARRD’s SIPAG ni Juan.',
  startDate: new Date('March 2, 2016'),
  endDate: new Date('March 4, 2016'),
  venue: 'PCAARRD Complex',
  region: 'Region IV-A',
  commodity: [
    'Abaca', 'Banana', 'Coconut', 'Coffee', 'Jackfruit', 'Mango', 'Peanut', 'Rice', 'Sweet Potato',
    'Vegetables', 'Milkfish', 'Shrimp','Mussel', 'Mud Crab', 'Tilapia', 'Aquafeeds', 'Sea Cucumber',
    'Oyster', 'Corals', 'Seaweed', 'Duck', 'Native Chicken', 'Swine', 'Goat', 'Dairy Buffalo', 'Rubber',
    'Cacao', 'Industrial Tree Plantation', 'Bamboo'
  ],
  consortium: 'CLARRDEC',
  consortiumFull: 'Central Luzon Agriculture and Resources Research and Development Consortium',
  vicinityMap: {path:'', credits:''},
  picture: {path:'assets/fiesta-logo.jpg', credits:''},
  coordinates: {lat:14.174963971804731, lng:121.22539615631104},

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

// Activities
var activities = [
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Registration of Guests',
    location: 'PCAARRD Lobby and Guest House',
    timestamp: new Date("March 2, 2016 8:00 am"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Opening Program',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 9:30 am"),
    subtitle: [
      'Doxology', 'National Anthem', 'Welcome Remarks and Introduction of Guest Speaker',
      'Message', 'Event Schedule Video'
     ],
    people: [
      'Cavite State University', 'Dr. Reynaldo V. Ebora', 'Sec. Mario G. Montejo'
    ]
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Ribbon cutting of the Consortia exhibits',
    location: 'Front of A.R. Tanco Hall Parking space',
    timestamp: new Date("March 2, 2016 10:00 am"),
    subtitle: [],
    people: [
      'Dra. Ebora', 'Dr. Edwin C. Villar', 'Dr. Danilo C. Cardenas'
    ]
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Transfer of Guests to DOST-PCAARRD Innovation and Technology Center (DPITC)',
    location: 'DPITC Back parking space',
    timestamp: new Date("March 2, 2016 10:30 am"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Ribbon cutting of SIPAG FIESTA Exhibit and Blessing of the DPITC Building',
    location: 'Front of DPITC',
    timestamp: new Date("March 2, 2016 11:00 am"),
    subtitle: [],
    people: [
      'Dr. Ebora', 'Sec. Montejo', 'Dr. Villar', 'Dr. Cardenas',
      'Other DOST Officials', 'Priest'
    ]
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Viewing of the Exhibits',
    location: 'DPITC Exhibit area (basement)',
    timestamp: new Date("March 2, 2016 11:15 am"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Registration for the Simultaneous Techno Forum Series of Aquatic and Livestock Sector',
    location: '',
    timestamp: new Date("March 2, 2016 12:30 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Aquatic",
    title: 'Philippine Shrimp Industry: Getting Back to the Top Through S&T',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 1:00 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Aquatic",
    title: 'Applying S&T for the Development of the Mangrove Crab Industry',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 1:40 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Aquatic",
    title: 'S&T Boosts and Productivity and Profitability of Milkfish Industry',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 2:20 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Aquatic",
    title: 'Exploring the Benham Rise: A New Philippine Territory',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 3:00 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Aquatic",
    title: 'Harnessing S&T for a Sustainable and Competitive Sea Cucumber Industry',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 3:40 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Aquatic",
    title: 'Revitalizing the Seaweeds Industry Through S&T',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 2, 2016 4:20 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Enhancing the Potentials of the Philippine Native Chicken through S&T',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 1:00 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Duck: Quality Breeders for a Bountiful Egg Harvest',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 1:40 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Philippine Pork to the World',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 2:20 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Dairy Buffalo: Creating Livelihood Opportunities from the Milk of the Beast',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 3:00 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Slaughter Goat: Sure Bet in Building Rural Assets',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 3:40 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Unlocking the Potentials of Dairy Goat thorugh S&T',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 4:20 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Livestock",
    title: 'Feed Security for the Local Livestock and Aqua Industries',
    location: 'W.D. Dar and C.B. Perez Rooms',
    timestamp: new Date("March 2, 2016 5:00 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Registration of Guests',
    location: 'PCAARRD Guest House',
    timestamp: new Date("March 3, 2016 7:30 am"),
    subtitle: [],
    people: [
      'Guests', 'Forum Attendees'
    ]
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Demonstration on Organic Farming and Field Guided Tour',
    location: 'Live Animal Display, DPITC and BPI Organic Farm',
    timestamp: new Date("March 3, 2016 8:30 am"),
    subtitle: [
      'Demonstration of Artificial Insemination of Goat',
      'Demonstration of dairy buffalo milking using portables milking machine',
      'Swine RFID and Remote Sensing'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Forest and Environment",
    title: 'Managing Watersheds for Climate Resiliency to Sustain Agri-Aqua Industries',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 8:30 am"),
    subtitle: [
      'Techno Forum Series'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Forest and Environment",
    title: 'Smarter Moves for a Competitive Agriculture',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 9:30 am"),
    subtitle: [
      'Techno Forum Series'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Crops",
    title: 'Weaving More Opportunities from Abaca Fiber',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 10:30 am"),
    subtitle: [
      'High Value Products from Abaca',
      'High-Yielding and Virus-resistant Abaca Hybrid',
      'Use of diagnostic kit for the Detection of Abaca bunchy top virus (ABTV)'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Crops",
    title: 'Mango: A Golden Future for the Golden Fruit',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 11:15 am"),
    subtitle: [
      'Use of Diagnostic Test Kits for the Detection of True-to-type Carabao Mango Variety',
      'Integrated Crom Management (ICM) and Postharvest Quality Management (PQM) in Mango Production'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Crops",
    title: 'Rice on the Rise',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 1:00 pm"),
    subtitle: [
      'Radiation-Modified Carrageenan Plant Growth Promoter (PGP) in Rice',
      'Rice Mechanization in Support to Rice Industry'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Crops",
    title: 'Saving the Banana Industry with S&T',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 1:45 pm"),
    subtitle: [
      'Use of Irradiated Lakatan to Address Banana Bunchy Top Virus',
      'Combating Fusarium Wilt Tropical Race 4 through Varieties and Biological Control'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Crops",
    title: 'Coconut: Reinvigorating the Productivity of the Tree of Life',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 2:30 pm"),
    subtitle: [
      'Mass Production, Release and Conservation of Companella sp. Against Coconut Scal Insect',
      'Coconut Genetic Resources for High Value Products - VCO and Coco Sugar',
      'Coconut Somatic Embryogenesis Technology',
      'Genomics-Assisted Breeding in Coconut'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "Crops",
    title: 'Going Nuts about Peanuts',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 3, 2016 3:15 pm"),
    subtitle: [
      'Improving Peanut Seed Production and Storage System through Super Grain Bag (SGB)',
      'Enhancing Peanut Productivity through IPM and Boron Fertilization'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Demonstration on Organic Farming and Field Guided Tour',
    location: 'BPI Organic Farm',
    timestamp: new Date("March 3, 2016 3:00 pm"),
    subtitle: [],
    people: []
  },


  {
    fiestaId: sipagId,
    sector: "",
    title: 'Registration of Guests',
    location: 'PCAARRD Guest House',
    timestamp: new Date("March 4, 2016 8:00 am"),
    subtitle: [],
    people: ['Guests', 'Forum Attendees']
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Demonstration on Organic Farming and Field Guided Tour',
    location: 'BPI Organic Farm, and Live Animal Display, DPITC',
    timestamp: new Date("March 4, 2016 8:30 am"),
    subtitle: [
      'Demonstration of Artificial Insemination of Goat',
      'Demonstration of dairy buffalo milking using portables milking machine',
      'Swine RFID and Remote Sensing'
    ],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Prospects of Agribusiness Enterprenuership for HighSChool Graduates',
    location: 'E.O. Tan Hall',
    timestamp: new Date("March 4, 2016 9:30 am"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Policy-based Tracer Study of In-School Students and Graudates in AAFNR Courses',
    location: '',
    timestamp: new Date("March 4, 2016 10:30 am"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'FIESTA Luncheon',
    location: 'PCAARRD Back PArking to C. R. Pagdilao Drive',
    timestamp: new Date("March 4, 2016 12:00 pm"),
    subtitle: [],
    people: []
  },
  {
    fiestaId: sipagId,
    sector: "",
    title: 'Closing Programs',
    location: 'Elvira O. Tan Hall',
    timestamp: new Date("March 4, 2016 2:00 pm"),
    subtitle: [
      'Presentation of the Highlights of the SIPAG Fiesta',
      'Awarding and Recognition of Consortium Exhibitors',
      'Intermission Number',
      'Closing Message'
    ],
    people: [
      'STII', 'Dir. Rodolfo O. Ilao', 'Dr. Danilo C. Cardenas'
    ]
  }
];
db.fiesta_activity.insertMany(activities);

// awards, posters, photos
/*
  Upload in UI since credits and image lang naman
*/

// videos
var videos = [{
  _id: ObjectId(),
  youtubeId: '57SjjxYL6aU',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: '8DVBPpwlca0',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'XKeVwPl9J6M',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'YRFIB5fTiwc',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'NR_NXiKDg7s',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'w6a5LzjD7Ko',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'mZ-TtNTfDmA',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'FvKfEqtLRgA',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'JBLDDV4cpMo',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: '8eZaH14X1uk',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}, {
  _id: ObjectId(),
  youtubeId: 'YBx_Ypr2g_E',
  tags: [],
  fiestaId: sipagId,
  credits: '',
}];
db.fiesta_video.insertMany(videos);

// blogs
// event
// more
// profile



// featured technology
var technologies = [
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Diagnostic kit for abaca virus',
    description: 'The diagnostic kit developed for the detection of abaca bunchy top virus (ABTV) is based on the principle of dot-ELISA (Enyme Link Immunosorbent Assay). The primary component of the diagnostic kit is the antiserum generated to specifically detect the presence of the virus. The generated antibody can detect infection in the lowest concentration. The activity and sensitivity of the generated antisera are comparable to that of the commercial kit and its effectivity in identifying ABTV-free and ABTV-positive plants has been confirmed.',
    commodity: 'Abaca',
    benefits: [
      'Plays an important role in detection, monitoring, and surveillance of ABTV for successful management and control of the disease and for sustainable production of abaca',
      'Initially produces an immuno-based assay system, which could be applied to develop similar diagnostic kits for other viruses infecting abaca or for other diseases infecting other commercially important crops',
      'Reliable, low cost, and fast for the detection of ABTV'
    ],
    targetBeneficiaries: [
      'Abaca farmers',
      'Producers',
      'Researchers/extension workers',
      'Plant certification body'
    ],
    locations: [
      'Leyte',
      'Catanduanes',
      'Albay',
      'Davao'
    ],
    partnerInstitutions: ['Visayas State University (VSU)']
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Adding higher value to abaca',
    description: 'Abaca (Musa textilis Nee) is a plant indigenous to the Philippines. Its fiber is the strongest among natural fibers. The country supplies about 85% of the world’s demand, mainly as pulp, raw fibers, ropes, yarns, and fibercrafts. Ironically, the Philippines imports back abaca in the form of specialty paper products (security/ currency base papers, tea bags, filters). The research and development program on abaca for specialty papers, textile and other high value products will help push for the optimum use of our abaca resources to benefit the local pulp and paper industry, and the abaca sector in general. The program has components on characterizing abaca fiber (both commercial and new varieties) and processing/value adding with the ultimate goal of encouraging local production of high-value abaca-based products, such as textile, security/currency base paper, tea bags, packaging and printing/writing papers, and nanocrystalline cellulose (NCC), and abaca-based toxic metal ion adsorbent.',
    commodity: 'Abaca',
    benefits: [
      'Expands raw material base for textile',
      'Reduces dependence on imported specialty paper products and improve the country’s currency notes',
      'Strengthens local economy by boosting manufacture of quality packaging and printing/writing papers using waste or low-grade abaca fiber as reinforcement',
      'Promotes the country as prime source of NCC from abaca fiber for high-end paper and composite products',
      'Increases economic value of abaca, thereby increasing farmers’ income'
    ],
    targetBeneficiaries: [
      'Abaca farmers and pulp mills',
      'Local paper and textile industry',
      'General public'
    ],
    locations: [
      'National Capital Region (NCR)',
      'Laguna',
      'Albay',
      'Sorsogon',
      'Catanduanes',
      'Leyte',
      'Samar',
      'Zamboanga',
      'Davao Oriental',
      'Davao del Sur',
      'North Cotabato',
      'Surigao del Sur'
    ],
    partnerInstitutions: [
      'Albay Agro-Industrial Development Corporation',
      'Catanduanes State University',
      'Forest Products Research and Development Institute (FPRDI)',
      'DOST - Industrial Technology Development Institute (ITDI)',
      'Philippine Fiber Development Authority (FIDA)',
      'DOST - Philippine Nuclear Research Institute (PNRI)',
      'DOST - Philippine Textile Research Institute',
      'Pulp and Paper Manufacturers Association, Inc.'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'High-yielding and virus-resistant abaca hybrid',
    description: '  Abaca (Musa textilis Nee.) or Manila hemp is indigenous to the Philippines and considered as one of the country’s most important crops. It is grown by Filipino farmers for its fibers. Abaca fibers serve as raw materials for cordage, textile, and various hand-woven crafts. But in recent years, the importance of abaca has doubled and use of abaca fibers has expanded. Pulps from abaca fibers are now good materials for the manufacture of specialty papers such as currency notes, filter papers, stencil papers, and tea bags. Developed by the Institute of Plant Breeding (IPB) of the University of the Philippines Los Baños (UPLB) using marker-aided breeding technique, the promising abaca hybrid resistant to bunchy top virus (BTV) has a potential fiber yield of 1.56 mt/ha. It also has a fiber recovery of 1.31%, 275 cm fiber length, and 65.8 kg/g-m tensile strength.',
    commodity: 'Abaca',
    benefits: [
      'Availability of BTV-resistant abaca planting materials for replanting in infected abaca areas',
      'Reduced losses due to ABTV',
      'Increased income of abaca farmers'
    ],
    targetBeneficiaries: [
      'Abaca farmers',
      'Producers',
      'Researchers/Extension workers'
    ],
    locations: [
      'Laguna',
      'Albay',
      'Catanduanes',
      'Leyte',
      'Samar',
      'Agusan del Norte',
      'North Cotabato',
      'Davao',
      'Zamboanga'
    ],
    partnerInstitutions: [
      'UPLB',
      'Bicol University (BU)',
      'Catanduanes State University (CSU)',
      'University of Eastern Philippines',
      'VSU',
      'Caraga State University',
      'University of Southern Mindanao (USM)',
      'University of Southeastern Philippines (USeP)',
      'Western Mindanao State University (WMSU)',
      'FIDA'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Combatting Fusarium wilt through resistant varieties and biological control',
    description: 'The ‘Cavendish’ banana constitutes 50% of the country’s banana production and provides employment to almost 330,000 Filipinos. The incidence of Fusarium wilt caused by Fusarium oxysporum f. sp. cubense (Foc) Tropical Race 4 (TR4) in 2012 threatened the milliondollar export industry of the Philippines. Introduced Cavendish somaclones from Taiwan were tested on Philippine soil and two showed promising performance in terms of productivity and market acceptability– the giant Cavendish tissue culture variant (GCTCV) 218 and 219. GCTCV 218 produces fingers and yield that are almost similar to Grand Nain (GN) at an average of 25 kilograms (kg)/bunch (note: GN averages 30 kg/bunch). GCTCV 219, on the other hand has relatively lower yield at an average of 18 kg/bunch but is sweeter and can be marketed as highland banana. Application of commercially-available microbial agents such as Trichoderma harzianum enhances action against Foc TR4 in GCTCV 218, a moderately resistant somaclone while GCTCV 219, which is very resistant to Fusarium wilt no longer requires microbial agents even in infested soil.',
    commodity: 'Banana',
    benefits: [
      'Areas infested with Foc TR4 can be planted with GCTCV 218 and 219 to become productive again'
    ],
    targetBeneficiaries: [
      'Cavendish growers and exporters'
    ],
    locations: [
      'Davao Region'
    ],
    partnerInstitutions: [
      'Bioversity International',
      'Bureau of Plant Industry (BPI) - Davao National Crop Research, Development and Production Support Center (DNCRDPSC)',
      'Southern Mindanao Agriculture and Resources Research and Development Consortium (SMARRDEC)',
      'Southern Philippines Agri-Business and Marine and Aquatic School of Technology (SPAMAST)',
      'USeP',
      'UPLB'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Use of developed lakatan to address banana bunchy top',
    description: 'Banana bunchy top virus (BBTV) is the most destructive virus disease of banana in the country as its severe incidence could wipe out a plantation singlehandedly. The vector, a winged aphid, Pentalonia nigronervosa, makes the disease difficult to contain and manage. Because it has no known cure, built-in resistance in lakatan is identified as a good management strategy to effectively control its spread. BBTV-resistant lakatan mutant lines were developed through irradiation and is currently showing intermediate resistance to the disease. Disease spread was observed to be slower in lakatan mutant lines compared to ordinary lakatan. The performance of the lines are being tested in Quirino, Laguna, Batangas, and Davao City and shows varying performance across location: 270–405 days to harvest; 6–9 hands per bunch; and 12–26 kg per bunch.',
    commodity: 'Banana',
    benefits: [
      'Slower spread of BBTV than ordinary lakatan',
      'Follower crops do not manifest symptom of BBTV hence, annualplanting is not necessary',
      'The use of resistant varieties in combination with good agriculturalpractices produce better quality fruits, hence commands better price'
    ],
    targetBeneficiaries: [
      'Lakatan growers',
      'Tissue culture laboratories and nursery growers'
    ],
    locations: [
      'Quirino',
      'Laguna',
      'Batangas',
      'Quezon',
      'Cavite',
      'Davao',
      'Cavite'
    ],
    partnerInstitutions: [
      'UPLB',
      'Quirino State University (QSU)',
      'Cavite State University (CvSU)',
      'BPI-DNCRDPSC',
      'Local government units (LGUs)'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Promising varieties of coconut for VCO and cocosap sugar production',
    description: 'Five hybrids (PCA 15-8, Syn Var, PCA 15-9, PCA 15-3, PCA 15-2); 5 tall varieties (BAYT, SNRT, TAGT, BAOT, LAGT); and 1 dwarf variety with 5–7 liters (L)/palm oil yield, high Vitamin E, and lauric content were recommended for virgin coconut oil (VCO) production. Moreover, four hybrids (PCA 15-2, PCA 15-1, PCA 15-3, and PB 121) and two dwarf varieties (CATD and MRD) were recommended for coconut sugar production with high toddy yield (6,000–8,600 L/hectare [ha] per month) and sap sugar (700–1,000 kg/ha per month). These varieties shall be part of the mass production activities for the replanting program in Regions 4-A, 5, 6, 7, 8, 9, 11, 12, and ARMM.',
    commodity: 'Coconut',
    benefits: [
      'Helps increase coconut productivity in existing varieties and singlecross hybrids'
    ],
    targetBeneficiaries: [
      'Coconut farmers ',
      'Entrepreneurs',
      'Researchers',
      'Policy makers'
    ],
    locations: [
      'Zamboanga City'
    ],
    partnerInstitutions: ['Philippine Coconut Authority-Zamboanga Research Center (PCA-ZRC)']
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Improved mass propagation technique for coconut',
    description: 'Coconut tissue culture through somatic embryogenesis is an alternative technique for mass production of coconut. With this technique, the plumule-derived planting materials are produced from embryonic callus-forming somatic embryos and later on regenerate into plantlets over a period of almost three years. One plumule from a mature coconut is expected to produce 1,000 plantlets following the enhanced PCA-coconut somatic embryogenesis technology (PCA-CSet).',
    commodity: 'Coconut',
    benefits: [
      'Helps produce quality planting materials of improved coconut varieties for the replanting program in coconut growing areas and new planting in coastal areas in Regions 4-A, 5, 6, 7, 8, 9, 11, 12, and ARMM.'
    ],
    targetBeneficiaries: [
      'Researchers',
      'Coconut growers',
      'Farming communities',
      'Extension workers',
      'Industry Stakeholders',
      'Policy makers'
    ],
    locations: [
      'Albay',
      'Zamboanga del Sur',
      'Laguna',
      'Davao del Sur',
      'Leyte'
    ],
    partnerInstitutions: [
      'PCA - Albay Research Center (ARC)',
      'PCA-ZRC',
      'UPLB',
      'UP Mindanao',
      'VSU',
      'Bicol University College of Agriculture and Forestry (BUCAF)'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Biological control of coconut scale insect (CSI)',
    description: 'Utilization of naturally-occuring insect predators and parasitoids is one of the Integrated Pest Management strategies for CSI infestation. Insect predators such as Telsimia sp. and Chilochorus sp. parasitize CSI by 65–92%. As a biological control procedure, about 80,000 adult predators have been mass reared and released monthly in CSI-infested coconut farms and in nearby areas to manage the CSI population. Mass rearing of additional biocon agent such as insect parasitoid (Comperiella sp.), is also being done for inoculative release in new areas with CSI invasion.',
    commodity: 'Coconut',
    benefits: [
      'Biological control using native parasitoids or predators could be a safer and more sustainable alternative to chemical control of CSI infestation'
    ],
    targetBeneficiaries: [
      'Coconut growers',
      'Farming communities ',
      'Extension workers',
      'Industry stakeholders ',
      'Policy makers',
      'Researchers'
    ],
    locations: [
      'Batangas',
      'Laguna',
      'Quezon ',
      'Basilan'
    ],
    partnerInstitutions: [
      'PCA',
      'UPLB',
      'Department of Agriculture (DA) - Regional Crop Protection Center-Region 4-A'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Quality planting materials for better coffee',
    description: 'Propagating coffee plants via somatic embryogenesis (SE), an asexual method of plant propagation, has been identified as a means to increase its production. Somatic embryos that will develop into mature plants are produced from tissues of the leaves and stems of coffee varieties with superior characteristics without seed formation/fertilization. This results in mass production of true-totype plants (plants that are genetically similar with each other). Maintenance of genetic integrity leads to the preservation of the favored characteristics of a coffee variety even after many generations of reproduction. From a single leaf explant used, as much as 150 plantlets can be produced. This is significantly higher from an embryo culture which has a 1:1 plantlet and embryo ratio.',
    commodity: 'Coffee',
    benefits: [
      'Gives farmers high revenue, thus, producing high-yielding and superior-quality coffee varieties using SE',
      'Helps the local growers introduce coffee novelties in the existing markets in the country'
    ],
    targetBeneficiaries: [
      'Coffee farmers',
      'Producers/cooperatives/associations ',
      'Researchers and extension workers ',
      'Consumers and entrepreneurs'
    ],
    locations: [
      'Benguet ',
      'Bukidnon',
      'Cavite',
      'Negros Occidental'
    ],
    partnerInstitutions: [
      'Benguet State University (BSU)',
      'Central Mindanao University (CMU)',
      'CvSU',
      'Central Philippine State University (CPSU)'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Metarhizium anisopliae as biological control for jackfruit fruit borer',
    description: 'Metarhizium anisopliae is a fungus that grows naturally in soils throughout the world. It is reported to infect over 200 insect pest species and is currently being used as a biological insecticide to control a number of pests. The sweet potato weevil isolate of Metarhizium was found effective in controlling jackfruit fruit borer, with an infection rate of 84.75. Immature stages of jackfruit fruit borer are most vulnerable because they are still on the surface of the fruit which are directly hit by the Metarhizium suspension during application. Jackfruit fruit borer could infest in all fruit stages except the ripe stage, thereby causing considerable loss in jackfruit production.',
    commodity: 'Jackfruit',
    benefits: [
      'Metarhizium is a natural alternative to pesticides that does not infect humans or other animals, and poses no environmental hazards',
      'It does not have significant effect on associated faunal decomposers in a jackfruit farm',
      'Production protocol established uses locally available substrate, i.e. palay',
      'More than 400% increase in net income could be realized using the technology'
    ],
    targetBeneficiaries: [
      'Jackfruit farmers',
      'Researchers/Extension workers',
      'Processors'
    ],
    locations: [
      'Leyte',
      'Samar',
      'Jackfruit-producing regions'
    ],
    partnerInstitutions: [
      'DA - Regional Field Office (DA-RFO) 8 ',
      'VSU',
      'LGUs'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Optimized vacuum-fried and dehydrated jackfruit products',
    description: 'Vacuum-fried jackfruit is a nutritious product from jackfruit pulp processed at low temperature (below 1000C) thereby maintaining the fruit’s color, flavor, sweetness and nutritional qualities. It is less oily, hence not prone to rancidity. Meanwhile, dehydrated jackfruit is a chewy product with golden yellow color and a mix of sweet and sour taste. Sodium metabisulfite (0.1%) is being used in the product as anti-microbial and antibrowning agent. Jackfruit fruit maturity is not a critical factor in processing dehydrated jackfruit.',
    commodity: 'Jackfruit',
    benefits: [
      'Vacuum-fried jackfruit has longer shelf life than other jackfruit products.',
      'Jackfruit processing increases utilization of jackfruit in the region, hence, increased income to its farmers.',
      'It generates employment in the locality.',
      'Oversupply of jackfruit during peak season could be processed into value-added products.'
    ],
    targetBeneficiaries: [
      'Jackfruit farmers',
      'Processors',
      'Traders and wholesalers',
      'Consumers'
    ],
    locations: [
      'Leyte',
      'Samar',
      'Jackfruit-producing regions'
    ],
    partnerInstitutions: [
      'DA - Regional Field Office (DA-RFO) 8 ',
      'VSU'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Dipstick kit for rapid detection of true-to-type ‘carabao’ mango variety',
    description: 'The technology is a simple and rapid diagnostic kit (dipstick kit) that could determine true-to-type ‘carabao’ mango variety planting materials using ‘carabao’ mango-specific DNA markers. The dipstick kit specifically identifies Philippine ‘carabao’ mango and differentiates it with other mango varieties to ensure dispersal of quality planting materials for sustained production of fresh fruits and quality raw materials for processing for the local and export market.',
    commodity: 'Mango',
    benefits: [
      'Addresses problem on mislabelling of mango seedlings produced in the nursery, especially in accredited nurseries',
      'Reliable, low cost, and rapid determination of true-to-type ‘carabao’ mango variety'
    ],
    targetBeneficiaries: [
      'Mango growers',
      'Nursery operators',
      'Researchers/extension workers',
      'Plant certification body'
    ],
    locations: [
      'Nationwide'
    ],
    partnerInstitutions: [
      'VSU',
      'USM',
      'BPI - Plant Material Certification Section'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Increasing productivity through development of new and improved peanut varieties: NSIC Pn 17, NSIC Pn 18',
    description: 'The use of improved varieties can increase crop productivity by 30%. The Asha (NSIC Pn 15) and Namnama 2 (NSIC Pn 14) varieties developed in 2002–2010 yield 2.2–3.5 t/ha as compared with the 0.60 t/ha produced by the native variety. These are big-seeded and are suitable for confectionery, often called 3-in-1 because they produce three seed classes. Continuous varietal improvement and trials are being done in various peanut-growing regions to evaluate the seeds\' performance and location specificity. The results serve as bases in selecting varieties for seed multiplication to enhance the peanut value chain. Through the PCAARRD Peanut R&D program, and in partnership with the DA, two new peanut varieties were approved by the National Seed Industry Council from 2013 to 2015—the NSIC Pn 2013 17 (ICGV 95390) also known as “G.D. Lasam-Pride” and NSIC 2013 Pn 18 (ICGV 01273) or Namnama 3. The NSIC Pn 19 (ICGV 96176) or Namnama 4 was recently nominated for NSIC registration and approval. These improved confectionery varieties are ideal for processing and were born from International Crops Research Institute for the Semi-Arid Tropics (ICRISAT)-bred varieties adapted to semi-arid conditions and localized to Cagayan Valley conditions, and eventually in major peanut growing areas of the country. The development of improved varieties coupled with improved storage technologies and practices is a helpful input for the improvement of peanut seed production management to be adopted under the formal and informal seed system for the attainment of sustainable supply of quality seeds.',
    commodity: 'Peanut',
    benefits: [
      'Consistent high yielding (2.48–2.97 tons (t)/ha) varieties',
      'Medium-maturing (106–108 days) varieties ideal for processing',
      'High oil content and sweet',
      'All-season varieties that will enhance year-round production',
      'NSIC Pn 17 (G.D. Lasam Pride) is the first identified drought-resistant variety in the Philippines thus, a potential variety responsive to El Niño',
      'Moderately resistant to foliar diseases and resistant Cercospora leaf spot and rust'
    ],
    targetBeneficiaries:[
      'Peanut growers',
      'Low-income farmers in corn, rice, coconut and fruit crops-based farming systems/communities',
      'Agri-entrepreneurs (seed growers and food processors)'
    ],
    locations: [
      'La Union ',
      'Ilocos Norte',
      'Cagayan ',
      'Isabela ',
      'Bukidnon',
      'Pampanga',
      'Tarlac',
      'Bohol'
    ],
    partnerInstitutions: [
      'DA - RFO 01/Ilocos Integrated Agricultural Research Center (ILIARC)',
      'DA - RFO 02/Cagayan Valley Research Center (CVRC)',
      'DA - RFO 03/Central Luzon Integrated Agricultural Research Center (CLIARC)',
      'DA - RFO 07/Central Visayas Integrated Agricultural Research Center (CENVIARC)',
      'DA - RFO 10/Northern Mindanao Agricultural Crop and Livestock Research Complex (NMACLRC)'
    ]
  },
  {
    fiestaId: sipagId,
    image: {path: '', credits: ''},
    name: 'Improving productivity through improved soil nutrient and pest management practices',
    description: 'The package of technology (POT) on peanut includes the adoption of recommended soil nutrient and pest management practices such as seed inoculation using Rhizobium, gypsum fertilization and the use of biological control agents (BCAs). Peanut can fix 45 kg of nitrogen (N)/ha through the root nodule bacteria using Rhizobium (Bradyrhizobium spp.). It is responsible in converting atmospheric N in a form available to plants. Inoculating the seeds prior to planting will boost root development and growth and this practice cuts down on production cost by reducing the use of inorganic fertilizers. Application of gypsum or calcium sulfate, on the other hand, provides calcium for direct absorption by the plant. Calcium helps develop pods and reduces “pops” or unfilled pods, as well as seed rot caused by fungi. On pest management, recent studies showed that Metarhizium anisopliae, a microbial control agent, can control leaf hopper and leaf folder in peanut. Metarhizium is a green muscardine fungus, which is safe to humans and animals and easy to mass produce. It is easy to apply and is compatible with other pest management options. Trichogramma spp., also a BCA, is efficient against cutworm, leaf folder, and leaf hopper. Trichogramma are dark-colored tiny wasps and the most widely used BCA in the world. A single Trichogramma, while multiplying itself, can destroy over 100 eggs of the pest. It offers a lower and more effective plant protection option than insecticides.',
    commodity: 'Peanut',
    benefits: [
      'Enhances N-fixation and increases crop production',
      'Produces quality pods and kernels',
      'Controls common insect pests in peanut',
      'Environment friendly',
      'Cost-effective and lowers cost of production'
    ],
    targetBeneficiaries: [
      'Peanut growers',
      'Low-income farmers in corn, rice, coconut, and fruit crops-based farming systems/communities',
      'Agri-entrepreneurs (seed growers and food processors)'
    ],
    locations: [
      'Cagayan',
      'Isabela',
      'La Union',
      'Ilocos Norte',
      'Tarlac',
      'Pampanga ',
      'Bohol',
      'Bukidnon'
    ],
    partnerInstitutions: [
      'Mariano Marcos State University (MMSU)',
      'Tarlac College of Agriculture (TCA)',
      'DA - RFO 01/ILIARC',
      'DA - RFO 02/CVRC',
      'DA - RFO 03/CLIARC',
      'DA - RFO 07/CENVIARC',
      'DA - RFO 10/NMACLRC'
    ]
  }
];

db.fiesta_featured_technology.insertMany(technologies);

db.fiesta_cms.insertOne({
  page: sipagId,
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
