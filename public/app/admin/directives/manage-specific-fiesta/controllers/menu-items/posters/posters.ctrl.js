'use strict';

(function () {
  angular.module('app')
        .controller('PostersCtrl', PostersCtrl);

	PostersCtrl.$inject = ['$scope', '$routeParams', '$timeout', 'UtilsSrvc', 'FiestaSrvc'];

	function PostersCtrl($scope, $routeParams, $timeout, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Local Variables and Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.fromAdd = null;
    $scope.posters = [];
    $scope.poster = {};
    $scope.focusedPoster = {}
    resetPoster();

    /***************************************************************************
     @INFO: Scope Function Headers
    ***************************************************************************/
    $scope.AddPoster = AddPoster;
    $scope.EditPoster = EditPoster;
    $scope.SubmitPoster = SubmitPoster;
    $scope.DeletePoster = DeletePoster;
    $scope.FocusPoster = FocusPoster;
    $scope.EditImagePoster = EditImagePoster;

    /***************************************************************************
     @INFO: Initialization
    ***************************************************************************/
    function receivedPosters(posters){
      $scope.posters = posters;
    }
    function gotError(err){
      UtilsSrvc.ToastError('Something went wrong!');
      UtilsSrvc.error(err);
    }
    FiestaSrvc.GetAllPoster(fiestaId)
      .then(receivedPosters, gotError);

    /***************************************************************************
     @INFO: Scope Functions Definition
    ***************************************************************************/
    function AddPoster() {
      $scope.fromAdd = true;
      $scope.toggletags = false;
      resetPoster();
    }

    function EditPoster(poster) {
      $scope.toggletags = false;
      $scope.fromAdd = false;
      $scope.poster._id = poster._id;
      $scope.poster.credits = poster.image.credits;
      $scope.poster.tags = [];
      for (var i = 0; poster.tags && i < poster.tags.length; i++) {
        $scope.poster.tags[i] = poster.tags[i];
      }
    }

    function SubmitPoster() {
      angular.element('.form-group').removeClass('has-error');

      // ADD POSTER
      if($scope.fromAdd){
        if(!$scope.poster.inputImage){
          UtilsSrvc.ToastError('No image uploaded for poster!');
          return;
        }
        if($scope.poster.inputImage.type != 'image/jpeg'){
          UtilsSrvc.ToastError('Only JPEG/JPG files are accepted!');
          $scope.poster.inputImage = null;
          return;
        }
        if($scope.poster.credits == ''){
          UtilsSrvc.ToastError('Please enter some photo credits.');
          angular.element('.poster-credits').addClass('has-error');
          return;
        }
        $scope.poster.loading = true;
        $scope.poster.okay = false;
        let newPoster = {
          'inputImage': $scope.poster.inputImage,
          'credits': $scope.poster.credits,
          'tags': $scope.poster.tags
        };

        FiestaSrvc.AddPoster(fiestaId, newPoster)
          .then(function (res) {
            //  wait for 1.5 seconds
            $timeout(function () {
              $scope.posters.push(res);
              UtilsSrvc.ToastSuccess('Added poster!');
              resetPoster();
              // wait for .2 seconds
              $timeout(function () {
                $scope.poster.okay = true;
                angular.element('#posterModal').modal('hide');
              }, 200);
            }, 1500);

          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
      // EDIT POSTER
      else {
        if($scope.poster.credits == ''){
          UtilsSrvc.ToastError('Please enter some photo credits.');
          angular.element('.poster-credits').addClass('has-error');
          return;
        }
        let updatedPoster = {
          '_id': $scope.poster._id,
          'credits': $scope.poster.credits,
          'tags': $scope.poster.tags
        };
        $scope.posterLoading = true;
        FiestaSrvc.EditPoster(fiestaId, updatedPoster)
          .then(function (res) {
            UtilsSrvc.wait(1000, function () {
              $scope.posterLoading = false;
              UtilsSrvc.ToastSuccess('Updated poster!');
              UtilsSrvc.UpdateObjectInList($scope.posters, res._id, {'image': res.image, 'tags': res.tags});
              angular.element('#posterModal').modal('hide');

            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
            $scope.posterLoading = false;

          });
      }
    }

    function DeletePoster(posterId) {
      if (UtilsSrvc.Ask('Delete this poster?')) {
        FiestaSrvc.DeletePoster(fiestaId, posterId)
          .then(function (res) {
            UtilsSrvc.ToastSuccess(res.message);
            UtilsSrvc.RemoveObjectInList($scope.posters, posterId);
          })
          .catch(function (res) {
            UtilsSrvc.ToastError(res);
          });
      }
    }

    function FocusPoster(poster) {
      angular.copy(poster, $scope.focusedPoster);
      $scope.focusedPoster.inputImage = null;
      $scope.focusedPoster.okay = false;
      $scope.focusedPoster.loading = false;
    }

    function EditImagePoster() {
      if(!$scope.focusedPoster.inputImage){
        UtilsSrvc.ToastSuccess('No changes made.');
        return;
      }
      if($scope.focusedPoster.inputImage.type != 'image/jpeg'){
        UtilsSrvc.ToastError('Only JPEG/JPG files are accepted!');
        $scope.focusedPoster.inputImage = null;
        return;
      }

      $scope.focusedPoster.loading = true;
      FiestaSrvc.UpdatePosterImage(fiestaId, $scope.focusedPoster)
        .then(function (res) {
          //  wait for 1.5 seconds
          $timeout(function () {
            $scope.focusedPoster.image = res.image;
            UtilsSrvc.UpdateObjectInList($scope.posters, res._id, {'image': null});
            UtilsSrvc.UpdateObjectInList($scope.posters, res._id, {'image': res.image});

            $scope.focusedPoster.loading = false;
            // wait for .2 seconds
            $timeout(function () {
              $scope.focusedPoster.okay = true;
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
    function resetPoster() {
      $scope.poster = {
        inputImage: null,
        credits: '',
        tags: [],
        loading: false,
        okay: true
      };
    }

  }
})();
