var db = new Mongo().getDB('fiesta_db');

var adminId = ObjectId();
/****************************************
  Admins
****************************************/
db.createCollection('fiesta_admin');
var admins = [{_id: adminId, isAdmin:true, email: 'superadmin@fiesta', password: '$2a$10$TneCpfWKsgbFsKk9VNudauaDBS1lQMaHBZt//rND6POzObIJ1/cLi', name:'Super Admin'}];
db.fiesta_admin.insertMany(admins);
db.fiesta.update({}, {$set: {createdBy: adminId}}, { multi: true });
