'use strict';

(function () {
  angular.module('app')
        .controller('AwardsCtrl', AwardsCtrl);

	AwardsCtrl.$inject = ['$scope', '$routeParams', '$timeout', 'UtilsSrvc', 'FiestaSrvc'];

	function AwardsCtrl($scope, $routeParams, $timeout, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Local Variables and Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.fromAdd = null;
    $scope.awards = [];
    $scope.award = {};
    $scope.focusedAward = {}
    resetAward();

    /***************************************************************************
     @INFO: Scope Function Headers
    ***************************************************************************/
    $scope.AddAward = AddAward;
    $scope.EditAward = EditAward;
    $scope.SubmitAward = SubmitAward;
    $scope.DeleteAward = DeleteAward;
    $scope.FocusAward = FocusAward;
    $scope.EditImageAward = EditImageAward;

    /***************************************************************************
     @INFO: Initialization
    ***************************************************************************/
    function receivedAwards(awards){
      $scope.awards = awards;
    }
    function gotError(err){
      UtilsSrvc.ToastError('Something went wrong!');
      UtilsSrvc.error(err);
    }
    FiestaSrvc.GetAllAward(fiestaId)
      .then(receivedAwards, gotError);

    /***************************************************************************
     @INFO: Scope Functions Definition
    ***************************************************************************/
    function AddAward() {
      $scope.toggletags = false;
      $scope.fromAdd = true;
      resetAward();
    }

    function EditAward(award) {
      $scope.toggletags = false;
      $scope.fromAdd = false;
      $scope.award._id = award._id;
      $scope.award.credits = award.image.credits;
      $scope.award.tags = [];
      for (var i = 0; award.tags && i < award.tags.length; i++) {
        $scope.award.tags[i] = award.tags[i];
      }
    }

    function SubmitAward() {
      angular.element('.form-group').removeClass('has-error');

      // ADD AWARD
      if($scope.fromAdd){
        if(!$scope.award.inputImage){
          UtilsSrvc.ToastError('No image uploaded for award!');
          return;
        }
        if($scope.award.inputImage.type != 'image/jpeg'){
          UtilsSrvc.ToastError('Only JPEG/JPG files are accepted!');
          $scope.award.inputImage = null;
          return;
        }
        if($scope.award.credits == ''){
          UtilsSrvc.ToastError('Please enter some photo credits.');
          angular.element('.award-credits').addClass('has-error');
          return;
        }
        $scope.award.loading = true;
        $scope.award.okay = false;
        let newAward = {
          'inputImage': $scope.award.inputImage,
          'credits': $scope.award.credits,
          'tags': $scope.award.tags,
        };

        FiestaSrvc.AddAward(fiestaId, newAward)
          .then(function (res) {
            //  wait for 1.5 seconds
            $timeout(function () {
              $scope.awards.push(res);
              UtilsSrvc.ToastSuccess('Added award!');
              resetAward();
              // wait for .2 seconds
              $timeout(function () {
                $scope.award.okay = true;
                angular.element('#awardModal').modal('hide');
              }, 200);
            }, 1500);

          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
          });
      }
      // EDIT AWARD
      else {
        if($scope.award.credits == ''){
          UtilsSrvc.ToastError('Please enter some photo credits.');
          angular.element('.award-credits').addClass('has-error');
          return;
        }
        let updatedAward = {
          '_id': $scope.award._id,
          'credits': $scope.award.credits,
          'tags': $scope.award.tags
        };
        $scope.awardLoading = true;
        FiestaSrvc.EditAward(fiestaId, updatedAward)
          .then(function (res) {
            UtilsSrvc.wait(1000, function () {
              UtilsSrvc.ToastSuccess('Updated award!');
              UtilsSrvc.UpdateObjectInList($scope.awards, res._id, {'image': res.image, 'tags': res.tags});
              angular.element('#awardModal').modal('hide');
              $scope.awardLoading = false;
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            UtilsSrvc.error(err);
            $scope.awardLoading = false;
          });
      }
    }

    function DeleteAward(awardId) {
      if (UtilsSrvc.Ask('Delete this award?')) {
        FiestaSrvc.DeleteAward(fiestaId, awardId)
          .then(function (res) {
            UtilsSrvc.ToastSuccess(res.message);
            UtilsSrvc.RemoveObjectInList($scope.awards, awardId);
          })
          .catch(function (res) {
            UtilsSrvc.ToastError(res);
          });
      }
    }

    function FocusAward(award) {
      angular.copy(award, $scope.focusedAward);
      $scope.focusedAward.inputImage = null;
      $scope.focusedAward.okay = false;
      $scope.focusedAward.loading = false;
    }

    function EditImageAward() {
      if(!$scope.focusedAward.inputImage){
        UtilsSrvc.ToastSuccess('No changes made.');
        return;
      }
      if($scope.focusedAward.inputImage.type != 'image/jpeg'){
        UtilsSrvc.ToastError('Only JPEG/JPG files are accepted!');
        $scope.focusedAward.inputImage = null;
        return;
      }

      $scope.focusedAward.loading = true;
      FiestaSrvc.UpdateAwardImage(fiestaId, $scope.focusedAward)
        .then(function (res) {
          //  wait for 1.5 seconds
          $timeout(function () {
            $scope.focusedAward.image = res.image;
            UtilsSrvc.UpdateObjectInList($scope.awards, res._id, {'image': null});
            UtilsSrvc.UpdateObjectInList($scope.awards, res._id, {'image': res.image});

            $scope.focusedAward.loading = false;
            // wait for .2 seconds
            $timeout(function () {
              $scope.focusedAward.okay = true;
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
    function resetAward() {
      $scope.award = {
        inputImage: null,
        credits: '',
        tags: [],
        loading: false,
        okay: true
      };
    }

  }
})();
