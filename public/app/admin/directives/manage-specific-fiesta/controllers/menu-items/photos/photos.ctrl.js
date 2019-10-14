'use strict';

(function () {
  angular.module('app')
        .controller('PhotosCtrl', PhotosCtrl);

	PhotosCtrl.$inject = ['$scope', '$routeParams', '$timeout', 'UtilsSrvc', 'FiestaSrvc'];

	function PhotosCtrl($scope, $routeParams, $timeout, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Local Variables and Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.fromAdd = null;
    $scope.photos = [];
    $scope.photo = {};
    $scope.focusedPhoto = {}
    resetPhoto();

    /***************************************************************************
     @INFO: Scope Function Headers
    ***************************************************************************/
    $scope.AddPhoto = AddPhoto;
    $scope.EditPhoto = EditPhoto;
    $scope.SubmitPhoto = SubmitPhoto;
    $scope.DeletePhoto = DeletePhoto;
    $scope.FocusPhoto = FocusPhoto;
    $scope.EditImagePhoto = EditImagePhoto;

    /***************************************************************************
     @INFO: Initialization
    ***************************************************************************/
    function receivedPhotos(photos){
      $scope.photos = photos;
    }
    function gotError(err){
      UtilsSrvc.ToastError('Something went wrong!');
      UtilsSrvc.error(err);
    }
    FiestaSrvc.GetAllPhoto(fiestaId)
      .then(receivedPhotos, gotError);

    /***************************************************************************
     @INFO: Scope Functions Definition
    ***************************************************************************/
    function AddPhoto() {
      $scope.toggletags = false;
      $scope.fromAdd = true;
      resetPhoto();
    }

    function EditPhoto(photo) {
      $scope.toggletags = false;
      $scope.fromAdd = false;
      $scope.photo._id = photo._id;
      $scope.photo.caption = photo.caption;
      $scope.photo.credits = photo.image.credits;
      $scope.photo.timestamp = new Date(photo.timestamp);
      $scope.photo.tags = [];
      for (var i = 0; photo.tags && i < photo.tags.length; i++) {
        $scope.photo.tags[i] = photo.tags[i];
      }
    }

    function SubmitPhoto() {
      angular.element('.form-group').removeClass('has-error');

      // ADD PHOTO
      if($scope.fromAdd){
        if(!$scope.photo.inputImage){
          UtilsSrvc.ToastError('No image uploaded for photo!');
          return;
        }
        if($scope.photo.inputImage.type != 'image/jpeg'){
          UtilsSrvc.ToastError('Only JPEG/JPG files are accepted!');
          $scope.photo.inputImage = null;
          return;
        }
        if($scope.photo.caption == ''){
          UtilsSrvc.ToastError('Please enter some photo caption.');
          angular.element('.photo-caption').addClass('has-error');
          return;
        }
        if($scope.photo.credits == ''){
          UtilsSrvc.ToastError('Please enter some photo credits.');
          angular.element('.photo-credits').addClass('has-error');
          return;
        }

        if(!$scope.photo.timestamp){
          UtilsSrvc.ToastError('Please specify the date stamp.');
          angular.element('.photo-timestamp').addClass('has-error');
          return;
        }
        $scope.photo.loading = true;
        $scope.photo.okay = false;
        let newPhoto = {
          'inputImage': $scope.photo.inputImage,
          'caption': $scope.photo.caption,
          'credits': $scope.photo.credits,
          'timestamp': $scope.photo.timestamp,
          'tags': $scope.photo.tags
        };

        FiestaSrvc.AddPhoto(fiestaId, newPhoto)
          .then(function (res) {
            //  wait for 1.5 seconds
            $timeout(function () {
              $scope.photos.push(res);
              UtilsSrvc.ToastSuccess('Added photo!');
              resetPhoto();
              // wait for .2 seconds
              $timeout(function () {
                angular.element('#photoModal').modal('hide');
                $scope.photo.okay = true;
              }, 200);
            }, 1500);

          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
      // EDIT PHOTO
      else {
        if($scope.photo.caption == ''){
          UtilsSrvc.ToastError('Please enter some photo caption.');
          angular.element('.photo-caption').addClass('has-error');
          return;
        }
        if($scope.photo.credits == ''){
          UtilsSrvc.ToastError('Please enter some photo credits.');
          angular.element('.photo-credits').addClass('has-error');
          return;
        }

        if(!$scope.photo.timestamp){
          UtilsSrvc.ToastError('Please specify the date stamp.');
          angular.element('.photo-timestamp').addClass('has-error');
          return;
        }
        let updatedPhoto = {
          '_id': $scope.photo._id,
          'credits': $scope.photo.credits,
          'caption': $scope.photo.caption,
          'timestamp': $scope.photo.timestamp,
          'tags': $scope.photo.tags
        };
        $scope.photoLoading = true;
        FiestaSrvc.EditPhoto(fiestaId, updatedPhoto)
          .then(function (res) {
            UtilsSrvc.wait(1000, function () {
              UtilsSrvc.ToastSuccess('Updated photo!');
              UtilsSrvc.UpdateObjectInList($scope.photos, res._id, res);
              angular.element('#photoModal').modal('hide');
              $scope.photoLoading = false;
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
    }

    function DeletePhoto(photoId) {
      if (UtilsSrvc.Ask('Delete this photo?')) {
        FiestaSrvc.DeletePhoto(fiestaId, photoId)
          .then(function (res) {
            UtilsSrvc.ToastSuccess(res.message);
            UtilsSrvc.RemoveObjectInList($scope.photos, photoId);
          })
          .catch(function (res) {
            UtilsSrvc.ToastError(res);
          });
      }
    }

    function FocusPhoto(photo) {
      angular.copy(photo, $scope.focusedPhoto);
      $scope.focusedPhoto.inputImage = null;
      $scope.focusedPhoto.okay = false;
      $scope.focusedPhoto.loading = false;
    }

    function EditImagePhoto() {
      if(!$scope.focusedPhoto.inputImage){
        UtilsSrvc.ToastSuccess('No changes made.');
        return;
      }
      if($scope.focusedPhoto.inputImage.type != 'image/jpeg'){
        UtilsSrvc.ToastError('Only JPEG/JPG files are accepted!');
        $scope.focusedPhoto.inputImage = null;
        return;
      }

      $scope.focusedPhoto.loading = true;
      FiestaSrvc.UpdatePhotoImage(fiestaId, $scope.focusedPhoto)
        .then(function (res) {
          //  wait for 1.5 seconds
          $timeout(function () {
            $scope.focusedPhoto.image = res.image;
            UtilsSrvc.UpdateObjectInList($scope.photos, res._id, {'image': null});
            UtilsSrvc.UpdateObjectInList($scope.photos, res._id, {'image': res.image});

            $scope.focusedPhoto.loading = false;
            // wait for .2 seconds
            $timeout(function () {
              $scope.focusedPhoto.okay = true;
              UtilsSrvc.ToastSuccess('Saved changes.');
            }, 200);
          }, 1500);
        })
        .catch(function (err) {
          UtilsSrvc.ToastError('Something went wrong!');
          UtilsSrvc.error(err);
        });
    }

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    function resetPhoto() {
      $scope.photo = {
        inputImage: null,
        credits: '',
        caption: '',
        timestamp: null,
        tags: [],
        loading: false,
        okay: true
      };
    }

  }
})();
