/***************************************************
* Router for the app's database api
***************************************************/
const express = require('express');
const router = express.Router();

/* Controllers */
const cms = require('./../../controllers/cms');
const admin = require('./../../controllers/admin');
const fiesta = require('./../../controllers/fiesta');
const sector = require('./../../controllers/sector');
const technology = require('./../../controllers/technology');
const activity = require('./../../controllers/activity');
const poster = require('./../../controllers/poster');
const award = require('./../../controllers/award');
const photo = require('./../../controllers/photo');
const profile = require('./../../controllers/profile');
const event = require('./../../controllers/event');
const video = require('./../../controllers/video');
const blog = require('./../../controllers/blog');
const more = require('./../../controllers/more');

const comment = require('./../../controllers/comment');
const reaction = require('./../../controllers/reaction');

const tech_cms = require('./../../controllers/tech_cms');
const tech_req = require('./../../controllers/tech');
// Middlewares
let checkId = require('./../../middlewares/authentication').checkId;
let checkFiesta = require('./../../middlewares/authentication').checkFiesta;
let checkToken = require('./../../middlewares/authentication').checkToken;

/****************
* Philippines
****************/
router.get('/philippines', function (req, res) {
  const philippines = require('philippines');
  res.status(200).send(philippines);
});

/****************
* C.M.S (temp)
****************/
router.route('/cms/:page')
  .get(cms.findCms);
router.route('/cms/:page/update-header')
  .put(cms.updateHeader);
router.route('/cms/:page/update-tagline')
  .put(cms.updateTagline);
router.route('/cms/:page/update-list')
  .put(cms.updateList);
router.route('/cms/:page/update-magazine')
  .put(cms.updateMagazine);
router.route('/cms/:page/update-carousel-feature')
  .put(cms.updateCarouselFeature);
router.route('/cms/:page/update-banner')
  .put(cms.updateBanner);
router.route('/cms/:page/update-carousel-image')
  .put(cms.updateCarouselImage);
router.route('/cms/:page/update-logo')
  .put(cms.updateLogo);

router.route('/cms/:page/update-execdir')
  .put(cms.updateFiestaTab);
router.route('/cms/:page/update-execdir-image')
  .put(cms.updateExecDirImage);
router.route('/cms/:page/update-sched-options')
  .put(cms.updateSchedOptions);
router.route('/cms/:page/update-ft-options')
  .put(cms.updateFtOptions);
router.route('/cms/:page/update-media-options')
  .put(cms.updateMediaOptions);

/****************
* Technology CMS
****************/
router.route('/tech_cms/:page')
  .get(tech_cms.findCms);
router.route('/tech_cms/:page/update-header')
  .put(tech_cms.updateHeader);
router.route('/tech_cms/:page/update-list')
  .put(tech_cms.updateList);
router.route('/tech_cms/:page/update-slider')
  .put(tech_cms.updateSlider);
router.route('/tech_cms/:page/add-slider')
  .put(tech_cms.addSlider);

router.route('/technology/request')
  .get(tech_req.getAllReq);
router.route('/technology/:techId/request')
  .post(tech_req.addRequest);
router.route('/technology/:requestId/request')
  .put(tech_req.changeStatus);

/****************
* Admin Accounts
****************/
router.route('/forgot-password')
  .post(admin.forgotPassword);
router.route('/authenticate/admin')
  .post(admin.authenticate);
router.route('/add-admin')
  .post(checkToken, admin.addAdmin);
router.route('/get-admin')
  .get(admin.findAll);
router.route('/edit-admin/name')
  .put(checkToken, admin.editAdminName);
router.route('/edit-admin/email')
  .put(checkToken, admin.editAdminEmail);
router.route('/edit-admin/location')
  .put(checkToken, admin.editAdminLocation);
router.route('/edit-admin/password')
  .put(checkToken, admin.editAdminPassword);

/****************
* Fiesta
****************/
router.route('/fiesta/all')
  .get(checkToken, fiesta.findAllType);

router.route('/fiesta')
  .get(fiesta.findAll)
  .post(checkToken, fiesta.insert);

router.route('/fiesta-admin/')
  .get(checkToken, fiesta.findAllByAdmin);
router.route('/fiesta-admin/:fiestaId')
  .get(checkToken, fiesta.findOneByAdmin);

router.route('/fiesta-latest/:count')
  .get(fiesta.findLatest);

router.route('/fiesta/:fiestaId')
  .get(checkId, fiesta.findOne)
  .put(checkToken, checkId, fiesta.restore)
  .delete(checkToken, checkId, fiesta.remove);

router.route('/fiesta/:fiestaId/delete')
  .delete(checkToken, checkId, fiesta.removePermanently);

router.route('/fiesta/:fiestaId/write-ups')
  .get(checkId, fiesta.findOneWriteUps);

router.route('/fiesta/:fiestaId/about-update')
  .put(checkToken, checkId, fiesta.updateAbout);
router.route('/fiesta/:fiestaId/vicinity-map-update')
  .put(checkToken, checkId, fiesta.updateVicinityMap);
router.route('/fiesta/:fiestaId/magazine-update')
  .put(checkToken, checkId, fiesta.updateMagazine);
router.route('/fiesta/:fiestaId/picture-update')
  .put(checkToken, checkId, fiesta.updatePicture);

router.route('/fiesta/:fiestaId/executive-update')
  .put(checkToken, checkId, fiesta.updateExecutive);
router.route('/fiesta/:fiestaId/executive-update-image')
  .put(checkToken, checkId, fiesta.updateExecutivePicture);

router.route('/fiesta/:fiestaId/editorial-update')
  .put(checkToken, checkId, fiesta.updateEditorial);
router.route('/fiesta/:fiestaId/infocus-update')
  .put(checkToken, checkId, fiesta.updateInfocus);
router.route('/fiesta/:fiestaId/fiestaval-update')
  .put(checkToken, checkId, fiesta.updateFiestaval);

router.route('/fiesta/:fiestaId/editorial-update-image')
  .put(checkToken, checkId, fiesta.updateEditorialPicture);
router.route('/fiesta/:fiestaId/infocus-update-image')
  .put(checkToken, checkId, fiesta.updateInfocusPicture);
router.route('/fiesta/:fiestaId/fiestaval-update-image')
  .put(checkToken, checkId, fiesta.updateFiestavalPicture);

/****************
* Sectors and Commodity
****************/
router.route('/sector')
  .get(sector.findAll);
router.route('/commodity')
  .get(sector.findAllCommodities);
router.route('/sector/:sector')
  .get(sector.findOneSector)
  .post(checkToken, sector.insertCommodity);
router.route('/sector/:sector/:commodity')
  .delete(checkToken, sector.removeCommodity);


/****************
* Technology
****************/
router.route('/fiesta/:fiestaId/technology')
  .get(checkId, checkFiesta, technology.findAll)
  .post(checkToken, checkId, checkFiesta, technology.insert);

router.route('/fiesta/:fiestaId/technology/:technologyId')
  .get(checkId, checkFiesta, technology.findOne)
  .delete(checkToken, checkId, checkFiesta, technology.remove);

router.route('/fiesta/:fiestaId/technology/:technologyId/details-update')
  .put(checkToken, checkId, checkFiesta, technology.updateDetails);
router.route('/fiesta/:fiestaId/technology/:technologyId/image-update')
  .put(checkToken, checkId, checkFiesta, technology.updateImage);

router.route('/fiesta/:fiestaId/technology-locations/')
  .get(checkId, checkFiesta, technology.findLocations);
router.route('/fiesta/:fiestaId/technology-institutions/')
  .get(checkId, checkFiesta, technology.findInstitutions);
router.route('/fiesta/:fiestaId/technology-beneficiaries/')
  .get(checkId, checkFiesta, technology.findBeneficiaries);

/****************
* Activity
****************/
router.route('/fiesta/:fiestaId/activity')
  .get(checkId, checkFiesta, activity.findAll)
  .post(checkToken, checkId, checkFiesta, activity.insert);

router.route('/fiesta/:fiestaId/activity/:activityId')
  .get(checkId, checkFiesta, activity.findOne)
  .put(checkToken, checkId, checkFiesta, activity.update)
  .delete(checkToken, checkId, checkFiesta, activity.remove);

/****************
* Profile
****************/
router.route('/fiesta/:fiestaId/profile')
  .get(checkId, checkFiesta, profile.findAll)
  .post(checkToken, checkId, checkFiesta, profile.insert);

router.route('/fiesta/:fiestaId/profile/:profileId')
  .get(checkId, checkFiesta, profile.findOne)
  .delete(checkToken, checkId, checkFiesta, profile.remove);

router.route('/fiesta/:fiestaId/profile/:profileId/details-update')
  .put(checkToken, checkId, checkFiesta, profile.updateDetails);
router.route('/fiesta/:fiestaId/profile/:profileId/image-update')
  .put(checkToken, checkId, checkFiesta, profile.updateImage);

/****************
* Event
****************/
router.route('/fiesta/:fiestaId/event')
  .get(checkId, checkFiesta, event.findAll)
  .post(checkToken, checkId, checkFiesta, event.insert);

router.route('/fiesta/:fiestaId/event/:eventId')
  .get(checkId, checkFiesta, event.findOne)
  .delete(checkToken, checkId, checkFiesta, event.remove);

router.route('/fiesta/:fiestaId/event/:eventId/details-update')
  .put(checkToken, checkId, checkFiesta, event.updateDetails);
router.route('/fiesta/:fiestaId/event/:eventId/image-update')
  .put(checkToken, checkId, checkFiesta, event.updateImage);

/****************
* Poster
****************/
router.route('/fiesta/:fiestaId/poster')
  .get(checkId, checkFiesta, poster.findAll)
  .post(checkToken, checkId, checkFiesta, poster.insert);

router.route('/fiesta/:fiestaId/poster/:posterId')
  .get(checkId, checkFiesta, poster.findOne)
  .delete(checkToken, checkId, checkFiesta, poster.remove);

router.route('/fiesta/:fiestaId/poster/:posterId/details-update')
  .put(checkToken, checkId, checkFiesta, poster.updateDetails);
router.route('/fiesta/:fiestaId/poster/:posterId/image-update')
  .put(checkToken, checkId, checkFiesta, poster.updateImage);

/****************
* Award
****************/
router.route('/fiesta/:fiestaId/award')
  .get(checkId, checkFiesta, award.findAll)
  .post(checkToken, checkId, checkFiesta, award.insert);

router.route('/fiesta/:fiestaId/award/:awardId')
  .get(checkId, checkFiesta, award.findOne)
  .delete(checkToken, checkId, checkFiesta, award.remove);

router.route('/fiesta/:fiestaId/award/:awardId/details-update')
  .put(checkToken, checkId, checkFiesta, award.updateDetails);
router.route('/fiesta/:fiestaId/award/:awardId/image-update')
  .put(checkToken, checkId, checkFiesta, award.updateImage);

/****************
* Photo
****************/
router.route('/fiesta/:fiestaId/photo')
  .get(checkId, checkFiesta, photo.findAll)
  .post(checkToken, checkId, checkFiesta, photo.insert);

router.route('/fiesta/:fiestaId/photo/:photoId')
  .get(checkId, checkFiesta, photo.findOne)
  .delete(checkToken, checkId, checkFiesta, photo.remove);

router.route('/fiesta/:fiestaId/photo/:photoId/details-update')
  .put(checkToken, checkId, checkFiesta, photo.updateDetails);
router.route('/fiesta/:fiestaId/photo/:photoId/image-update')
  .put(checkToken, checkId, checkFiesta, photo.updateImage);

/****************
* Video
****************/
router.route('/fiesta/:fiestaId/video')
  .get(checkId, checkFiesta, video.findAll)
  .post(checkToken, checkId, checkFiesta, video.insert);

router.route('/fiesta/:fiestaId/video/:videoId')
  .get(checkId, checkFiesta, video.findOne)
  .put(checkToken, checkId, checkFiesta, video.update)
  .delete(checkToken, checkId, checkFiesta, video.remove);

/****************
* Blog
****************/
router.route('/fiesta/:fiestaId/blog')
  .get(checkId, checkFiesta, blog.findAll)
  .post(checkToken, checkId, checkFiesta, blog.insert);

router.route('/fiesta/:fiestaId/blog/:blogId')
  .get(checkId, checkFiesta, blog.findOne)
  .delete(checkToken, checkId, checkFiesta, blog.remove);

router.route('/fiesta/:fiestaId/blog/:blogId/details-update')
  .put(checkToken, checkId, checkFiesta, blog.updateDetails);
router.route('/fiesta/:fiestaId/blog/:blogId/image-update')
  .put(checkToken, checkId, checkFiesta, blog.updateImage);

/****************
* More
****************/
router.route('/fiesta/:fiestaId/more')
  .get(checkId, checkFiesta, more.findAll)
  .post(checkToken, checkId, checkFiesta, more.insert);

router.route('/fiesta/:fiestaId/more/:moreId')
  .get(checkId, checkFiesta, more.findOne)
  .put(checkToken, checkId, checkFiesta, more.update)
  .delete(checkToken, checkId, checkFiesta, more.remove);

/****************
* Reaction
****************/
router.route('/fiesta/:fiestaId/:type/:typeId/reaction')
  .get(checkFiesta, reaction.findAll);

router.route('/fiesta/:fiestaId/reaction')
  .post(checkFiesta, reaction.insert);

router.route('/fiesta/:fiestaId/:type/:typeId/:userId/reaction')
  .get(checkFiesta, reaction.findOne)
  .delete(checkFiesta, reaction.remove);

router.route('/fiesta/reaction/:type/date/:timestampBefore/:timestampAfter')
  .get(reaction.findByDate);

/****************
* Comment
****************/
router.route('/comment')
  .get(comment.findAll);

router.route('/fiesta/:fiestaId/comment')
  .post(checkFiesta, comment.insert);

router.route('/fiesta/:commentId/comment/approve')
  .put(comment.approve);

router.route('/fiesta/comment/find/:type')
  .get(comment.findByType);

router.route('/fiesta/comment/:type/date/:timestampBefore/:timestampAfter')
  .get(comment.findTypeByDate);

router.route('/fiesta/:fiestaId/comment/:type')
  .get(checkFiesta, comment.findByFiesta);

router.route('/fiesta/:fiestaId/comment/:type/date/:timestampBefore/:timestampAfter')
  .get(checkFiesta, comment.findFiestaByDate);

router.route('/fiesta/:fiestaId/comment/:type/:typeId')
  .get(checkFiesta, comment.findOne);

router.route('/fiesta/:commentId/comment/remove')
  .delete(comment.remove);


/*
* must always be at the BOTTOM
* this is for catching unexisting routes
* */
router.all('/*', function(req, res) {
  res.status(403).send({message:'You have no business here!'});
});

module.exports = router;
