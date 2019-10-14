"use strict";

(function () {
  angular.module("app")
         .factory("FiestaSrvc", FiestaSrvc);

  FiestaSrvc.$inject = ['$http', '$q', '$log', 'AuthSrvc'];

  function FiestaSrvc($http, $q, $log, AuthSrvc) {
    let dbUrl = 'api';
    var service = {};

    /***************************************************************************
     @INFO: Fiesta Services
    ***************************************************************************/
    service.GetPhilippines = GetPhilippines;

    /*** Admin Accounts **/
      service.GetAllAdmin = GetAllAdmin;
      service.AddAdmin = AddAdmin;
      service.ChangeAdminName = ChangeAdminName;
      service.ChangeAdminEmail = ChangeAdminEmail;
      service.ChangeAdminLocation = ChangeAdminLocation;
      service.ChangeAdminPassword = ChangeAdminPassword;
      service.ForgotPassword = ForgotPassword;

    /*** Commodity **/
      service.GetAllSector = GetAllSector;
      service.GetAllCommodities = GetAllCommodities;
      service.GetOneSector = GetOneSector;
      service.AddCommodity = AddCommodity;

    /*** Fiesta **/
      service.GetAllType = GetAllType;
      service.GetAll = GetAll;
      service.GetAllByAdmin = GetAllByAdmin;
      service.GetLatest = GetLatest;
      // service.GetAllPublished = GetAllPublished;
      service.GetOne = GetOne;
      service.GetOneByAdmin = GetOneByAdmin;
      service.AddOne = AddOne;
      service.DeleteOne = DeleteOne;
      service.DeleteOnePermanently = DeleteOnePermanently;
      service.RestoreOne = RestoreOne;

    /*** Fiesta WriteUps **/
      service.GetWriteUps = GetWriteUps;
      service.EditEditorial = EditEditorial;
      service.EditInFocus = EditInFocus;
      service.EditFiestaval = EditFiestaval;
      service.EditExecutive = EditExecutive;
      service.EditExecutivePicture = EditExecutivePicture;
      service.EditEditorialPicture = EditEditorialPicture;
      service.EditInFocusPicture = EditInFocusPicture;
      service.EditFiestavalPicture = EditFiestavalPicture;

    /*** Fiesta About **/
      service.EditPicture = EditPicture;
      service.EditPublished = EditPublished;
      service.EditTitle = EditTitle;
      service.EditDescription = EditDescription;
      service.EditDate = EditDate;
      service.EditVenue = EditVenue;
      service.EditRegion = EditRegion;
      service.EditConsortium = EditConsortium;
      service.EditCommodity = EditCommodity;
      service.EditVicinityMap = EditVicinityMap;
      service.EditMagazine = EditMagazine;
      service.EditGoogleMap = EditGoogleMap;

    /*** Fiesta Featured Technology **/
      service.GetAllLocations = GetAllLocations;
      service.GetAllInstitutions = GetAllInstitutions;
      service.GetAllBeneficiaries = GetAllBeneficiaries;

      service.GetAllTechnology = GetAllTechnology;
      service.GetOneTechnology = GetOneTechnology;
      service.AddTechnology = AddTechnology;
      service.EditTechnology = EditTechnology;
      service.DeleteTechnology = DeleteTechnology;

    /*** Fiesta Activities **/
      service.GetAllActivity = GetAllActivity;
      service.GetOneActivity = GetOneActivity;
      service.AddActivity = AddActivity;
      service.EditActivity = EditActivity;
      service.DeleteActivity = DeleteActivity;

    /*** Fiesta Profile **/
      service.GetAllProfile = GetAllProfile;
      service.GetOneProfile = GetOneProfile;
      service.AddProfile = AddProfile;
      service.EditProfile = EditProfile;
      service.DeleteProfile = DeleteProfile;

    /*** Fiesta Blog **/
      service.GetAllBlog = GetAllBlog;
      service.GetOneBlog = GetOneBlog;
      service.AddBlog = AddBlog;
      service.EditBlog = EditBlog;
      service.DeleteBlog = DeleteBlog;

    /*** Fiesta Event **/
      service.GetAllEvent = GetAllEvent;
      service.GetOneEvent = GetOneEvent;
      service.AddEvent = AddEvent;
      service.EditEvent = EditEvent;
      service.DeleteEvent = DeleteEvent;

    /*** Fiesta Poster **/
      service.GetAllPoster = GetAllPoster;
      service.GetOnePoster = GetOnePoster;
      service.AddPoster = AddPoster;
      service.EditPoster = EditPoster;
      service.DeletePoster = DeletePoster;

    /*** Fiesta Awards **/
      service.GetAllAward = GetAllAward;
      service.GetOneAward = GetOneAward;
      service.AddAward = AddAward;
      service.EditAward = EditAward;
      service.DeleteAward = DeleteAward;

    /*** Fiesta Photos **/
      service.GetAllPhoto = GetAllPhoto;
      service.GetOnePhoto = GetOnePhoto;
      service.AddPhoto = AddPhoto;
      service.EditPhoto = EditPhoto;
      service.DeletePhoto = DeletePhoto;

    /*** Fiesta Videos **/
      service.GetAllVideo = GetAllVideo;
      service.GetOneVideo = GetOneVideo;
      service.AddVideo = AddVideo;
      service.EditVideo = EditVideo;
      service.DeleteVideo = DeleteVideo;
      service.GetYoutubeData = GetYoutubeData;

    /*** Image Updates **/
      service.UpdateAwardImage = UpdateAwardImage;
      service.UpdatePosterImage = UpdatePosterImage;
      service.UpdatePhotoImage = UpdatePhotoImage;
      service.UpdateTechImage = UpdateTechImage;
      service.UpdateBlogImage = UpdateBlogImage;
      service.UpdateEventImage = UpdateEventImage;
      service.UpdateProfileImage = UpdateProfileImage;

    /*** Fiesta More **/
      service.GetAllMore = GetAllMore;
      service.GetOneMore = GetOneMore;
      service.AddMore = AddMore;
      service.EditMore = EditMore;
      service.DeleteMore = DeleteMore;

    /*** Fiesta Reaction **/
      service.GetAllReaction = GetAllReaction;
      service.GetOneReaction = GetOneReaction;
      service.AddReaction = AddReaction;
      service.DeleteReaction = DeleteReaction;
      service.GetReactionByDate = GetReactionByDate;

    /*** Fiesta Comments **/
      service.GetAllComments = GetAllComments;
      service.GetCommentsByType = GetCommentsByType;
      service.GetTypeCommentsByDate = GetTypeCommentsByDate;
      service.GetCommentsByFiesta = GetCommentsByFiesta;
      service.GetFiestaCommentsByDate = GetFiestaCommentsByDate;
      service.GetOneComment = GetOneComment;
      service.AddComment = AddComment;
      service.ApproveComment = ApproveComment;
      service.DeleteComment = DeleteComment;

    /*** Fiesta CMS **/
      service.GetOneCms = GetOneCms;
      service.EditCmsHeader = EditCmsHeader;
      service.EditCmsTagline = EditCmsTagline;
      service.EditCmsList = EditCmsList;
      service.EditCmsCarouselFeature = EditCmsCarouselFeature;
      service.EditCmsMagazine = EditCmsMagazine;
      service.EditCmsBanner = EditCmsBanner;
      service.EditCmsLogo = EditCmsLogo;
      service.EditCmscCarouselImage = EditCmscCarouselImage;

      service.EditCMSFiestaTab = EditCMSFiestaTab;
      service.EditExecDirImage = EditExecDirImage;
      service.EditSchedOptions = EditSchedOptions;
      service.EditFtOptions = EditFtOptions;
      service.EditMediaOptions = EditMediaOptions;

    return service;


    /***************************************************************************
     @INFO: Function Definitions
    ***************************************************************************/
    function GetPhilippines() {
      let deferred = $q.defer();
      $http.get(dbUrl+'/philippines')
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Admin Accounts **/
    function GetAllAdmin() {
      let deferred = $q.defer();
      $http.get(dbUrl+'/get-admin')
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function AddAdmin(admin) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      $http.post(dbUrl+'/add-admin', admin)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function ChangeAdminName(name) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      $http.put(dbUrl+'/edit-admin/name', {name:name})
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function ChangeAdminEmail(email) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      $http.put(dbUrl+'/edit-admin/email', {email:email})
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function ChangeAdminLocation(city, province, region) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      $http.put(dbUrl+'/edit-admin/location', {
        city: city,
        province: province,
        region: region
      })
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function ChangeAdminPassword(oldPassword, newPassword) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      $http.put(dbUrl+'/edit-admin/password', {
        oldPassword: oldPassword,
        newPassword: newPassword
      })
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function ForgotPassword(email) {
      let deferred = $q.defer();
      $http.post(dbUrl+'/forgot-password', {email: email})
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Commodities **/
    function GetAllSector() {
      let deferred = $q.defer();
      $http.get(dbUrl+'/sector')
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetAllCommodities() {
      let deferred = $q.defer();
      $http.get(dbUrl+'/commodity')
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetOneSector(sector) {
      let deferred = $q.defer();
      $http.get(dbUrl+'/sector/'+sector)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function AddCommodity(commodity, sector) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if (!sector || sector.trim() == '') {
        deferred.reject('No sector submitted!');
        return deferred.promise;
      }
      let data = {'commodity': commodity};
      $http.post(dbUrl+'/sector/'+sector, data)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Fiesta **/
    function GetAllType() {
      if(!AuthSrvc.IsLoggedIn()) return;
      let deferred = $q.defer();
      $http.get(dbUrl+'/fiesta/all')
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetAll() {
      let deferred = $q.defer();
      $http.get(dbUrl+'/fiesta')
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetAllByAdmin() {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      $http.get(dbUrl+'/fiesta-admin')
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetLatest(count){
      let deferred = $q.defer();
      $http.get(dbUrl+'/fiesta-latest/'+count)
        .then(function (response) {
          deferred.resolve(response.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetOne(fiestaId) {
      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.get(dbUrl+'/fiesta/'+fiestaId)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function GetOneByAdmin(fiestaId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.get(dbUrl+'/fiesta-admin/'+fiestaId)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function AddOne(data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let fiesta = {
        'title': data.title,
        'startDate': data.startDate,
        'endDate': data.endDate
      };
      $http.post("api/fiesta", fiesta)
           .then(function (response) {
             deferred.resolve(response.data);
           }, function (error) {
             $log.error(error);
             deferred.reject(error);
           });
      return deferred.promise;
    }

    function DeleteOne(fiestaId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.delete(dbUrl+'/fiesta/'+fiestaId)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function DeleteOnePermanently(fiestaId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.delete(dbUrl+'/fiesta/'+fiestaId+'/delete')
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function RestoreOne(fiestaId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.put(dbUrl+'/fiesta/'+fiestaId)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Fiesta WriteUps **/
    function GetWriteUps(fiestaId) {
      let deferred = $q.defer();

      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.get(dbUrl+'/fiesta/'+fiestaId+'/write-ups')
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditEditorial(fiestaId, editorial) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/editorial-update', editorial)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function EditInFocus(fiestaId, infocus) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/infocus-update', infocus)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function EditFiestaval(fiestaId, fiestaval) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/fiestaval-update', fiestaval)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function EditExecutive(fiestaId, executive) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/executive-update', executive)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditExecutivePicture(fiestaId, picture) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-executive', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/executive-update-image', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditEditorialPicture(fiestaId, picture) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-editorial', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/editorial-update-image', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function EditInFocusPicture(fiestaId, picture) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-infocus', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/infocus-update-image', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }
    function EditFiestavalPicture(fiestaId, picture) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-fiestaval', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/fiestaval-update-image', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Fiesta About **/
    function EditPicture(fiestaId, picture) {
      if(!AuthSrvc.IsLoggedIn()) return;
      alert(fiestaId);
      console.log(picture);
      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-picture', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/picture-update', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditPublished(fiestaId, published) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'published',
        'published': published
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditTitle(fiestaId, title) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'title',
        'title': title
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditDescription(fiestaId, description) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'description',
        'description': description
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditDate(fiestaId, startDate, endDate) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'date',
        'startDate': startDate,
        'endDate': endDate
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditVenue(fiestaId, venue) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'venue',
        'venue': venue
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditRegion(fiestaId, region) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'region',
        'region': region
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditConsortium(fiestaId, consortium, consortiumFull) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'consortium',
        'consortium': consortium.toUpperCase(),
        'consortiumFull': consortiumFull
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditCommodity(fiestaId, commodities) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'commodity',
        'commodity': commodities.sort()
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditVicinityMap(fiestaId, vicinityMap) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-vicinity-map', vicinityMap);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/vicinity-map-update', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditGoogleMap(fiestaId, coordinates) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = {
        subject: 'coordinates',
        'coordinates': coordinates
      };
      $http.put(dbUrl+'/fiesta/'+fiestaId+'/about-update', data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditMagazine(fiestaId, magazine) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();

      if(!fiestaId || fiestaId.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let data = new FormData();
      data.append('magazine-magazine', magazine);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      $http.put(dbUrl+'/fiesta/'+fiestaId+'/magazine-update', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }


    /*** Fiesta Technology **/
    function GetAllLocations(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology-locations';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
    function GetAllBeneficiaries(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology-beneficiaries';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
    function GetAllInstitutions(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology-institutions';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetAllTechnology(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneTechnology(fiestaId, technologyId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology/'+technologyId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!technologyId || technologyId.trim() == ''){
        deferred.reject('No technologyId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddTechnology(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let technology = new FormData();
      technology.append('commodity', data.commodity);
      technology.append('name', data.name);
      technology.append('description', data.description);
      technology.append('photo-technology', data.image.input);
      technology.append('credits', data.image.credits);
      for (let i = 0; i < data.benefits.length; i++)
        technology.append('benefits', data.benefits[i].toString());
      for (let i = 0; i < data.partnerInstitutions.length; i++)
        technology.append('partnerInstitutions', data.partnerInstitutions[i].toString());
      for (let i = 0; i < data.targetBeneficiaries.length; i++)
        technology.append('targetBeneficiaries', data.targetBeneficiaries[i].toString());
      for (let i = 0; i < data.locations.length; i++)
        technology.append('locations', data.locations[i].toString());
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      $http.post(url, technology, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditTechnology(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No technologyId submitted!');
        return deferred.promise;
      }

      let updates = {};
      if(data.name){
        updates.name = data.name;
      }
      if(data.commodity){
        updates.commodity = data.commodity;
      }
      if(data.description){
        updates.description = data.description;
      }
      if(data.image.credits){
        updates.credits = data.image.credits;
      }
      if(data.locations){
        updates.locations = data.locations;
      }
      if(data.targetBeneficiaries){
        updates.targetBeneficiaries = data.targetBeneficiaries;
      }
      if(data.benefits){
        updates.benefits = data.benefits;
      }
      if(data.partnerInstitutions){
        updates.partnerInstitutions = data.partnerInstitutions;
      }

      $http.put(url, updates)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteTechnology(fiestaId, technologyId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology/'+technologyId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!technologyId || technologyId.trim() == ''){
        deferred.reject('No technologyId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Activity **/
    function GetAllActivity(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/activity';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneActivity(fiestaId, activityId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/activity/'+activityId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!activityId || activityId.trim() == ''){
        deferred.reject('No activityId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddActivity(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/activity';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let activity = {
        'title': data.title,
        'sector': data.sector,
        'location': data.location,
        'timestamp': data.timestamp,
        'people': (data.people)? data.people: [],
        'subtitle': (data.subtitle)? data.subtitle: []
      };
      $http.post(url, activity)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditActivity(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/activity/'+data._id;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No activityId submitted!');
        return deferred.promise;
      }

      let activity = {
        'title': data.title,
        'sector': data.sector,
        'location': data.location,
        'timestamp': data.timestamp,
        'people': (data.people)? data.people: [],
        'subtitle': (data.subtitle)? data.subtitle: []
      };
      $http.put(url, activity)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteActivity(fiestaId, activityId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/activity/'+activityId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!activityId || activityId.trim() == ''){
        deferred.reject('No activityId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Profile **/
    function GetAllProfile(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/profile';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneProfile(fiestaId, profileId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/profile/'+profileId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!profileId || profileId.trim() == ''){
        deferred.reject('No profileId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddProfile(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/profile';
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      // use form data to cater file uploads
      let profile = new FormData();
      profile.append('photo-profile', data.inputImage);
      profile.append('credits', data.credits.toString());
      profile.append('title', data.title.toString());
      profile.append('timestamp', (data.timestamp)? new Date(data.timestamp): new Date());
      profile.append('body', data.body.toString());
      for (let i = 0; i < data.authors.length; i++)
        profile.append('authors', angular.toJson(data.authors[i]));
      for (let i = 0; i < data.tags.length; i++)
        profile.append('tags', data.tags[i].text.toString());

      $http.post(url, profile, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditProfile(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/profile/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No profileId submitted!');
        return deferred.promise;
      }

      let profile = {
        'title': data.title,
        'body': data.body,
        'timestamp': (data.timestamp)? new Date(data.timestamp): new Date(),
        'credits': data.credits,
        'authors': (data.authors)? data.authors: []
      };
      profile.tags = [];
      for (let i = 0; i < data.tags.length; i++) {
        profile.tags.push(data.tags[i].text);
      }

      $http.put(url, profile)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteProfile(fiestaId, profileId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/profile/'+profileId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!profileId || profileId.trim() == ''){
        deferred.reject('No profileId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Blog **/
    function GetAllBlog(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/blog';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneBlog(fiestaId, blogId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/blog/'+blogId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!blogId || blogId.trim() == ''){
        deferred.reject('No blogId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddBlog(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/blog';
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      // use form data to cater file uploads
      let blog = new FormData();
      blog.append('photo-blog', data.inputImage);
      blog.append('credits', data.credits.toString());
      blog.append('title', data.title.toString());
      blog.append('timestamp', (data.timestamp)? new Date(data.timestamp): new Date());
      blog.append('body', data.body.toString());
      blog.append('author', data.author.toString());
      for (var i = 0; i < data.tags.length; i++)
        blog.append('tags', data.tags[i].text.toString());

      $http.post(url, blog, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditBlog(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/blog/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No blogId submitted!');
        return deferred.promise;
      }

      let blog = {
        'title': data.title,
        'body': data.body,
        'timestamp': (data.timestamp)? new Date(data.timestamp): new Date(),
        'author': data.author,
        'credits': data.credits
      };
      blog.tags = [];
      for (let i = 0; i < data.tags.length; i++) {
        blog.tags.push(data.tags[i].text);
      }

      $http.put(url, blog)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteBlog(fiestaId, blogId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/blog/'+blogId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!blogId || blogId.trim() == ''){
        deferred.reject('No blogId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Event **/
    function GetAllEvent(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/event';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneEvent(fiestaId, eventId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/event/'+eventId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!eventId || eventId.trim() == ''){
        deferred.reject('No eventId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddEvent(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/event';
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      // use form data to cater file uploads
      let event = new FormData();
      event.append('photo-event', data.inputImage);
      event.append('credits', data.credits.toString());
      event.append('title', data.title.toString());
      event.append('type', data.type.toString());
      event.append('timestamp', (data.timestamp)? new Date(data.timestamp): new Date());
      event.append('body', data.body.toString());
      for (let i = 0; i < data.authors.length; i++)
        event.append('authors', angular.toJson(data.authors[i]));
      for (let i = 0; i < data.tags.length; i++)
        event.append('tags', data.tags[i].text.toString());

      $http.post(url, event, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditEvent(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/event/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No eventId submitted!');
        return deferred.promise;
      }

      let event = {
        'title': data.title,
        'type': data.type,
        'body': data.body,
        'timestamp': (data.timestamp)? new Date(data.timestamp): new Date(),
        'credits': data.credits,
        'authors': (data.authors)? data.authors: []
      };
      event.tags = [];
      for (let i = 0; i < data.tags.length; i++) {
        event.tags.push(data.tags[i].text);
      }

      $http.put(url, event)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteEvent(fiestaId, eventId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/event/'+eventId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!eventId || eventId.trim() == ''){
        deferred.reject('No eventId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Poster **/
    function GetAllPoster(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/poster';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOnePoster(fiestaId, posterId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/poster/'+posterId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!posterId || posterId.trim() == ''){
        deferred.reject('No posterId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddPoster(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/poster';
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      // use form data to cater file uploads
      let poster = new FormData();
      poster.append('photo-poster', data.inputImage);
      poster.append('credits', data.credits.toString());
      for (var i = 0; i < data.tags.length; i++)
        poster.append('tags', data.tags[i].text.toString());

      $http.post(url, poster, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditPoster(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/poster/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No posterId submitted!');
        return deferred.promise;
      }

      let updates = {};
      if(data.credits){
        updates.credits = data.credits;
      }
      if(data.tags){
        updates.tags = [];
        for (var i = 0; i < data.tags.length; i++) {
          updates.tags.push(data.tags[i].text);
        }
      }
      $http.put(url, updates)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeletePoster(fiestaId, posterId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/poster/'+posterId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!posterId || posterId.trim() == ''){
        deferred.reject('No posterId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Awards **/
    function GetAllAward(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/award';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneAward(fiestaId, awardId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/award/'+awardId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!awardId || awardId.trim() == ''){
        deferred.reject('No awardId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddAward(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/award';
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      // use form data to cater file uploads
      let award = new FormData();
      award.append('photo-award', data.inputImage);
      award.append('credits', data.credits.toString());
      for (var i = 0; i < data.tags.length; i++)
        award.append('tags', data.tags[i].text.toString());

      $http.post(url, award, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditAward(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/award/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No awardId submitted!');
        return deferred.promise;
      }

      let updates = {};
      if(data.credits){
        updates.credits = data.credits;
      }
      if(data.tags){
        updates.tags = [];
        for (var i = 0; i < data.tags.length; i++) {
          updates.tags.push(data.tags[i].text);
        }
      }

      $http.put(url, updates)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteAward(fiestaId, awardId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/award/'+awardId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!awardId || awardId.trim() == ''){
        deferred.reject('No awardId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Photos **/
    function GetAllPhoto(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/photo';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOnePhoto(fiestaId, photoId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/photo/'+photoId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!photoId || photoId.trim() == ''){
        deferred.reject('No photoId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddPhoto(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/photo';
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      // use form data to cater file uploads
      let photo = new FormData();
      photo.append('photo-photo', data.inputImage);
      photo.append('caption', data.caption.toString());
      photo.append('credits', data.credits.toString());
      photo.append('timestamp', data.timestamp);
      for (let i = 0; i < data.tags.length; i++)
        photo.append('tags', data.tags[i].text.toString());

      $http.post(url, photo, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditPhoto(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/photo/'+data._id+'/details-update';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No photoId submitted!');
        return deferred.promise;
      }

      let updates = {};
      if(data.credits){
        updates.credits = data.credits;
      }
      if(data.caption){
        updates.caption = data.caption;
      }
      if(data.timestamp){
        updates.timestamp = data.timestamp;
      }
      if(data.tags){
        updates.tags = [];
        for (let i = 0; i < data.tags.length; i++) {
          updates.tags.push(data.tags[i].text);
        }
      }

      $http.put(url, updates)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeletePhoto(fiestaId, photoId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/photo/'+photoId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!photoId || photoId.trim() == ''){
        deferred.reject('No photoId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta Video **/
    function GetAllVideo(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/video';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneVideo(fiestaId, videoId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/video/'+videoId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!videoId || videoId.trim() == ''){
        deferred.reject('No videoId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddVideo(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/video';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let video = {
        'credits': data.credits,
        'youtubeId': data.youtubeId
      };
      video.tags = [];
      for (var i = 0; i < data.tags.length; i++) {
        video.tags.push(data.tags[i].text);
      }

      $http.post(url, video)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditVideo(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/video/'+data._id;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No videoId submitted!');
        return deferred.promise;
      }

      let updates = {};
      if(data.credits){
        updates.credits = data.credits;
      }
      if(data.youtubeId){
        updates.youtubeId = data.youtubeId;
      }
      updates.tags = [];

      if(data.tags){
        for (let i = 0; i < data.tags.length; i++) {
          updates.tags.push(data.tags[i].text);
        }
      }

      $http.put(url, updates)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteVideo(fiestaId, videoId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/video/'+videoId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!videoId || videoId.trim() == ''){
        deferred.reject('No videoId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetYoutubeData(youtubeId) {
      let deferred = $q.defer();
      let api_key = 'AIzaSyCZfsNAFuay_VoCROlRB9ei2lXG5LUpbpM';
      let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+youtubeId+'&fields=items/snippet/title,items/snippet/description&key=';

      $http.get(url + api_key)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Fiesta More **/
    function GetAllMore(fiestaId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/more';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneMore(fiestaId, moreId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/more/'+moreId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!moreId || moreId.trim() == ''){
        deferred.reject('No moreId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddMore(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/more';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let more = {
        'title': data.title,
        'body': data.body,
        'authors': (data.authors)? data.authors: [],
      };

      $http.post(url, more)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditMore(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/more/'+data._id;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!data._id || data._id.trim() == ''){
        deferred.reject('No moreId submitted!');
        return deferred.promise;
      }

      let more = {
        'title': data.title,
        'body': data.body,
        'authors': (data.authors)? data.authors: [],
      };

      $http.put(url, more)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteMore(fiestaId, moreId) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/more/'+moreId;

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!moreId || moreId.trim() == ''){
        deferred.reject('No moreId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    /*** Image Updates **/

    function UpdateAwardImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();

      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }

      let updates = new FormData();
      updates.append('photo-award', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/award/'+data._id+'/image-update';

      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function UpdatePosterImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();

      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }

      let updates = new FormData();
      updates.append('photo-poster', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/poster/'+data._id+'/image-update';

      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function UpdatePhotoImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();

      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }

      let updates = new FormData();
      updates.append('photo-photo', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/photo/'+data._id+'/image-update';

      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function UpdateTechImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();

      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }
      let updates = new FormData();
      updates.append('photo-technology', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/technology/'+data._id+'/image-update';
      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function UpdateBlogImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }
      let updates = new FormData();
      updates.append('photo-blog', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/blog/'+data._id+'/image-update';
      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function UpdateEventImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }
      let updates = new FormData();
      updates.append('photo-event', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/event/'+data._id+'/image-update';
      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function UpdateProfileImage(fiestaId, data) {
      if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!fiestaId){
        deferred.reject('No fiesta id!');
        return deferred.promise;
      }
      if(!data._id){
        deferred.reject('No Object id!');
        return deferred.promise;
      }
      let updates = new FormData();
      updates.append('photo-profile', data.inputImage);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      let url = dbUrl+'/fiesta/'+fiestaId+'/profile/'+data._id+'/image-update';
      // send http request
      $http.put(url, updates, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Fiesta Reactions **/
    function GetAllReaction(fiestaId, type, typeId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/'+type+'/'+typeId+'/reaction';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!typeId){
        deferred.reject('No typeId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneReaction(fiestaId, type, typeId, userId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/'+type+'/'+typeId+'/'+userId+'/reaction';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!typeId){
        deferred.reject('No typeId submitted!');
        return deferred.promise;
      }
      if(!userId){
        deferred.reject('No userId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddReaction(fiestaId, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/reaction';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let reaction = {
        'type': data.type,
        'typeId': data.typeId,
        'userId': data.userId,
        'reaction': data.reaction
      };

      $http.post(url, reaction)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function DeleteReaction(fiestaId, type, typeId, userId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/'+type+'/'+typeId+'/'+userId+'/reaction';

      if(!fiestaId){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!typeId){
        deferred.reject('No typeId submitted!');
        return deferred.promise;
      }
      if(!userId){
        deferred.reject('No userId submitted!');
        return deferred.promise;
      }

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetReactionByDate(data) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/reaction/'+data.type+'/date/'+data.timestampBefore+'/'+data.timestampAfter;
      if(!data.type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!data.timestampBefore){
        deferred.reject('No timestampBefore submitted!');
        return deferred.promise;
      }
      if(!data.timestampAfter){
        deferred.reject('No timestampAfter submitted!');
        return deferred.promise;
      }
      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    /*** Fiesta Comments **/
    function GetAllComments() {
      let deferred = $q.defer();
      let url = dbUrl+'/comment';

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetCommentsByType(type) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/comment/find/'+type;

      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetTypeCommentsByDate(type, timestampBefore, timestampAfter) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/comment/'+type+'/date/'+timestampBefore+'/'+timestampAfter;

      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!timestampBefore){
        deferred.reject('No timestampBefore submitted!');
        return deferred.promise;
      }
      if(!timestampAfter){
        deferred.reject('No timestampAfter submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetCommentsByFiesta(fiestaId, type) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/comment/'+type;

      if(!fiestaId) {
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetFiestaCommentsByDate(fiestaId, type, timestampBefore, timestampAfter) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/comment/'+type+'/date/'+timestampBefore+'/'+timestampAfter;

      if(!fiestaId) {
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!timestampBefore){
        deferred.reject('No timestampBefore submitted!');
        return deferred.promise;
      }
      if(!timestampAfter){
        deferred.reject('No timestampAfter submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function GetOneComment(fiestaId, type, typeId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/comment/'+type+'/'+typeId;

      if(!fiestaId) {
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      if(!type){
        deferred.reject('No type submitted!');
        return deferred.promise;
      }
      if(!typeId){
        deferred.reject('No typeId submitted!');
        return deferred.promise;
      }

      $http.get(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function AddComment(fiestaId, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+fiestaId+'/comment';

      if(!fiestaId || fiestaId.trim() == ''){
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let comment = {
        'username': data.username,
        'type': data.type,
        'typeId': data.typeId,
        'comment': data.comment
      };

      $http.post(url, comment)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function ApproveComment(commentId, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+commentId+'/comment/approve';

      if(!commentId || commentId.trim() == ''){
        deferred.reject('No commentId submitted!');
        return deferred.promise;
      }

      let comment = {
        approve: data
      }

      $http.put(url, comment)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }


    function DeleteComment(commentId) {
      let deferred = $q.defer();
      let url = dbUrl+'/fiesta/'+commentId+'/comment/remove';

      $http.delete(url)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    //  CMS
    function GetOneCms(page) {
      let deferred = $q.defer();

      if(!page || page.trim() == ''){
        $log.error('No page submitted!');
        deferred.reject('No page submitted!');
        return deferred.promise;
      }

      $http.get(dbUrl+'/cms/'+page)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          $log.error(error);
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsHeader(page, data) {
      // if(!AuthSrvc.IsLoggedIn()) return;
      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-header';

      let header = {
        'header': data
      };

      $http.put(url, header)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsTagline(page, data) {
      // if(!AuthSrvc.IsLoggedIn()) return;
      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-tagline';

      let tagline = {
        'tagline': data
      };

      $http.put(url, tagline)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsList(page, data) {
      // if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-list';

      let list = {
        'sort': {
          'show': data.sort.show,
          'options': {
            'title': data.sort.options.title,
            'date': data.sort.options.date,
            'consortium': data.sort.options.consortium
          }
        },
        'filter': {
          'show': data.filter.show,
          'options': {
            'consortium': data.filter.options.consortium,
            'region': data.filter.options.region,
            'year': data.filter.options.year,
            'commodity': data.filter.options.commodity
          }
        },
        'counter': data.counter,
        'cards': {
          'option': data.cards.option,
          'order': data.cards.order,
        },
        'pagination': {
          'pageSize': data.pagination.pageSize,
          'currentPage': data.pagination.currentPage
        }
      };
      $http.put(url, list)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }


    function EditCmsMagazine(page, data) {
      // if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-magazine';

      let magazine = {
        'pdf': {
          'show': data.show,
          'sort': {
            'option': data.sortoption,
            'order': data.sortorder
          }
        }
      };
      $http.put(url, magazine)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsCarouselFeature(page, data) {
      // if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-carousel-feature';

      $http.put(url, data)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditCmsBanner(page, picture) {
      // if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!page || page.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-banner', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/cms/'+page+'/update-banner', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditCmsLogo(page, picture) {
      // if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!page || page.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-logo', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/cms/'+page+'/update-logo', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditCmscCarouselImage(page, picture) {
      // if(!AuthSrvc.IsLoggedIn()) return;

      let deferred = $q.defer();
      if(!page || page.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }
      let data = new FormData();
      data.append('photo-carousel-image', picture);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/cms/'+page+'/update-carousel-image', data, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditCMSFiestaTab(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-execdir';

      let execdirname = {
        'fiesta': {
          'execdir': {
            'default': data.fiesta.execdir.default,
            'director': data.fiesta.execdir.director,
            'message': data.fiesta.execdir.message,
            'download': data.fiesta.execdir.download
          },
          'about': data.fiesta.about,
          'react': data.fiesta.react,
          'comment': data.fiesta.comment
        }
      };

      $http.put(url, execdirname)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditExecDirImage(page, data) {
      // if(!AuthSrvc.IsLoggedIn()) return;
      let deferred = $q.defer();
      if(!page || page.trim() == ''){
        $log.error('No fiestaId submitted!');
        deferred.reject('No fiestaId submitted!');
        return deferred.promise;
      }

      let imagedata = new FormData();
      imagedata.append('photo-logo', data.fiesta.execdir.default);
      let config = {
        headers: {"Content-Type": undefined},
        transformRequest: angular.identity
      };
      $http.put(dbUrl+'/cms/'+page+'/update-execdir-image', imagedata, config)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });
      return deferred.promise;
    }

    function EditSchedOptions(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-sched-options';

      let sched = {
        'schedule': {
          'sched':data.schedule.sched,
          'map': data.schedule.map,
          'googlemap': data.schedule.googlemap
        }
      };

      $http.put(url, sched)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditFtOptions(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-ft-options';

      let ft = {
        'feattech': {
          'react':data.feattech.react,
          'comment': data.feattech.comment,
        }
      };

      $http.put(url, ft)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }

    function EditMediaOptions(page, data) {
      let deferred = $q.defer();
      let url = dbUrl+'/cms/'+page+'/update-media-options';

      let media = {
        'media': {
          'photo':data.media.photo,
          'video': data.media.video,
        }
      };

      $http.put(url, media)
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    }
  }
})();
