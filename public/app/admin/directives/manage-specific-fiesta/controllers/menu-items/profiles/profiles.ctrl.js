'use strict';

(function () {
  angular.module('app')
        .controller('ProfilesCtrl', ProfilesCtrl);

	ProfilesCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function ProfilesCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.options = UtilsSrvc.GetSummernoteOptions();
    $scope.action = '';
    $scope.writeup = {
      'inputImage': null,
      'image': {path:'', credits:''},
      'title': '',
      'body': '',
      'authors': [],
      'tags': [],
      'timestamp': null
    };
    $scope.focused = {
      'image': {path:'', credits:''},
      'title': '',
      'body': '',
      'authors': [],
      'tags': [],
      'timestamp': null
    };
    $scope.profiles = [];

    let GetProfiles = FiestaSrvc.GetAllProfile;
    GetProfiles(fiestaId)
      .then(function (profiles) {
        $scope.profiles = profiles;
      })
      .catch(function (err) {
        UtilsSrvc.error(err);
      });

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    $scope.toggleUpload = function () {
      angular.element('#upload').click();
    };
    $scope.addAuthor = function(name, position){
      if(name.trim()=='' && position.trim()=='') return;
      if(!$scope.writeup.authors) $scope.writeup.authors = [];
      $scope.writeup.authors.pushIfNotExist({
        'name': name,
        'position': position
      });
      $scope.author = {name:'', position:''};
    };
    $scope.add = function () {
      $scope.toggletags = false;
      $scope.action='add';
      $scope.writeup = {title:'',body:'',author:'', tags: [], timestamp:null};
    };
    $scope.select = function (item) {
      $scope.toggletags = false;
      $scope.action = 'edit';
      $scope.writeup = {
        'inputImage': null,
        'image': {path:'', credits:''},
        'title': '',
        'body': '',
        'authors': [],
        'tags': [],
        'timestamp': null
      };
      angular.copy(item, $scope.writeup);
    };
    $scope.focus = function (item) {
      angular.copy(item, $scope.focused);
    };
    $scope.AddProfile = function (item) {
      let AddProfile = FiestaSrvc.AddProfile;
      item.credits = (item.image)? item.image.credits: '';
      if (!item.title) {
        UtilsSrvc.ToastError('Enter some title!');
        return;
      }
      if (!item.inputImage) {
        UtilsSrvc.ToastError('No image uploaded!');
        return;
      }
      if (!item.credits) {
        UtilsSrvc.ToastError('Enter some credits!');
        return;
      }
      if (!item.body) {
        UtilsSrvc.ToastError('Enter some body!');
        return;
      }
      $scope.profileLoading = true;
      AddProfile(fiestaId, item)
        .then(function (newProfile) {
          UtilsSrvc.wait(1000, function () {
            $scope.writeup = {
              'inputImage': null,
              'image': {path:'', credits:''},
              'title': '',
              'body': '',
              'authors': [],
              'tags': [],
              'timestamp': null
            };
            $scope.profiles.push(newProfile);
            UtilsSrvc.ToastSuccess('Added profile!');
            angular.element('#editProfile').modal('hide');
            $scope.profileLoading = false;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.profileLoading = false;
        });
    };

    $scope.EditProfile = function (item) {
      let EditProfile = FiestaSrvc.EditProfile;
      item.credits = item.image.credits;
      $scope.profileLoading = true;
      EditProfile(fiestaId, item)
        .then(function (edited) {
          UtilsSrvc.wait(1000, function () {
            UtilsSrvc.UpdateObjectInList($scope.profiles, item._id, edited);
            UtilsSrvc.ToastSuccess('Edited profile!');
            angular.element('#editProfile').modal('hide');
            $scope.profileLoading = false;
          });

        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.profileLoading = false;
        });
    };

    $scope.point = function (tech) {
      $scope.profilePointer = tech;
    };

    $scope.EditImage = function (inputImage) {
      $scope.loading = true;
      let image = {
        '_id': $scope.profilePointer._id.toString(),
        'inputImage': inputImage
      };
      FiestaSrvc.UpdateProfileImage($routeParams.fiestaId, image)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(1500, function () {
            $scope.loading = false;
            $scope.profilePointer.image.path = data.image.path;
            angular.element('#editImage').modal('hide');
            UtilsSrvc.ToastSuccess('Updated image!');
            $scope.inputImage = null;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err.toString());
        });
    };

    $scope.DeleteProfile = function (id) {
      if (UtilsSrvc.Ask('Delete this profile?')) {
        let DeleteProfile = FiestaSrvc.DeleteProfile;

        DeleteProfile(fiestaId, id)
        .then(function (success) {
          UtilsSrvc.RemoveObjectInList($scope.profiles, id);
          UtilsSrvc.ToastSuccess(success.message);
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
        });
      }
    };

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
  }
})();
