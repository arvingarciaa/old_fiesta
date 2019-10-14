'use strict';

(function () {
  angular.module('app')
        .controller('ContentsCtrl', ContentsCtrl);

	ContentsCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function ContentsCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.options = UtilsSrvc.GetSummernoteOptions();
    $scope.fiesta = {};

    let GetWriteUps = FiestaSrvc.GetWriteUps;

    GetWriteUps(fiestaId)
      .then(function (fiesta) {
        $scope.fiesta = fiesta;
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
    $scope.select = function (item, selected) {
      if(item){
        angular.copy(item, $scope.writeup);
        $scope.writeup.credits = item.image.credits;
      } else {
        $scope.writeup = {
          title: '',
          credits: '',
          timestamp: null,
          authors: [],
          body: ''
        };
      }
      $scope.selected = selected;
    };
    $scope.EditWriteUp = function (writeup) {
      let action = FiestaSrvc['Edit'+$scope.selected.replace(/\-/g, '')];

      $scope.contentLoading = true;
      action(fiestaId, writeup)
        .then(function (success) {
          UtilsSrvc.wait(1000, function () {
            $scope.contentLoading = false;
            $scope.fiesta[$scope.selected.replace(/\-/g, '').toLowerCase()] = success;
            UtilsSrvc.ToastSuccess('Changes were saved!');
            angular.element('#editContent').modal('hide');
          });
        })
        .catch(function (err) {
          $scope.contentLoading = false;
          UtilsSrvc.ToastError('Something went wrong!');
          UtilsSrvc.error(err);
        });
    };
    $scope.editImage = function (selected) {
      $scope.selectedImage = selected;
    };
    $scope.EditWriteUpImage = function (image, selected) {
      let action = FiestaSrvc['Edit'+selected.replace(/\-/g, '')+'Picture'];
      if(!image){
        UtilsSrvc.ToastError('No image uploaded!');
        return;
      }
      $scope.contentImageLoading = true;
      action(fiestaId, image)
        .then(function (success) {
          UtilsSrvc.wait(1000, function () {
            $scope.contentImageLoading = false;
            $scope.fiesta[selected.replace(/\-/g, '').toLowerCase()] = success;
            UtilsSrvc.ToastSuccess('Changes were saved!');
            angular.element('#editThumbnail').modal('hide');
            $scope.inputImage = null;
          });
        })
        .catch(function (err) {
          $scope.contentImageLoading = false;
          UtilsSrvc.ToastError('Something went wrong!');
          UtilsSrvc.error(err);
        });
    };

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
  }
})();
