/*
  Must be in fiesta_app folder
  run these command:
      mongo localhost:27017/fiesta_db _mongodb/all_fiesta.js
*/
load("_mongodb/fiestas/abaca.js")
load("_mongodb/fiestas/coffee.js")
load("_mongodb/fiestas/dairy-buffalo.js")
load("_mongodb/fiestas/davao.js")
load("_mongodb/fiestas/dragonfruit.js")
load("_mongodb/fiestas/jackfruit.js")
load("_mongodb/fiestas/kalimudan.js")
load("_mongodb/fiestas/mango.js")
load("_mongodb/fiestas/rambakan.js")
load("_mongodb/fiestas/rootcrop.js")
load("_mongodb/fiestas/sardines.js")
load("_mongodb/fiestas/seaweed.js")
load("_mongodb/fiestas/sipag-ni-juan.js")
load("_mongodb/fiestas/staarrdec.js")
load("_mongodb/fiestas/sweet-potato.js")
load("_mongodb/fiestas/wesmaarrdec.js")
db.fiesta.updateMany({},{$set:{published: true}})
