'use strict';

(function () {
  angular.module('app')
        .controller('ExecutiveCtrl', ExecutiveCtrl);

	ExecutiveCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function ExecutiveCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Local Variables and Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.writeup = {
      title: '',
      authors: [],
      body: ''
    };
    $scope.executive = {
      title: '',
      authors: [],
      body: ''
    };

    /***************************************************************************
     @INFO: Scope Function Headers
    ***************************************************************************/
    $scope.EditExecutive = EditExecutive;
    $scope.Edit = Edit;
    $scope.EditExecutivePicture = EditExecutivePicture;

    /***************************************************************************
     @INFO: Initialization
    ***************************************************************************/
    let GetWriteUps = FiestaSrvc.GetWriteUps;
    GetWriteUps(fiestaId)
      .then(function (fiesta) {
        $scope.fiesta = fiesta;
        if(fiesta.executive) $scope.executive = fiesta.executive;
      })
      .catch(function (err) {
        UtilsSrvc.error(err);
      });

    /***************************************************************************
     @INFO: Scope Functions Definition
    ***************************************************************************/
    function EditExecutive(writeup) {
      let action = FiestaSrvc.EditExecutive;
      if(writeup.title.trim() == ''){
        UtilsSrvc.ToastError('Please add a title!');
        return;
      }

      $scope.executiveLoading = true;
      action(fiestaId, writeup)
        .then(function (success) {
          UtilsSrvc.wait(1000, function () {
            $scope.executiveLoading = false;
            UtilsSrvc.ToastSuccess('Changes were saved!');
            $scope.executive = success;
            $scope.edit = false;
          });
        })
        .catch(function (err) {
          $scope.executiveLoading = false;
          UtilsSrvc.ToastError('Something went wrong!');
          UtilsSrvc.error(err);
        });
    }

    function Edit() {
      $scope.writeup.title = $scope.executive.title;
      $scope.writeup.authors = $scope.executive.authors;
      $scope.writeup.body = $scope.executive.body;
      $scope.edit=true;
    }

    function EditExecutivePicture(image) {
      if(!image){
        UtilsSrvc.ToastError('No photo uploaded!');
        return;
      }

      $scope.picLoading = true;
      FiestaSrvc.EditExecutivePicture(fiestaId, image)
        .then(function (data) {
          // wait for 1.5 seconds
          UtilsSrvc.wait(1500, function () {
            $scope.executive = data.executive;
            UtilsSrvc.ToastSuccess('Updated the author\'s photo!');
            $scope.picLoading = false;
            UtilsSrvc.wait(500, function (){
              $scope.inputImage = null;
              angular.element('#save').hide();
            });
          });
        })
        .catch(function (err) {
          $scope.picLoading = false;
          UtilsSrvc.ToastError(err.toString());
        });
    }
  }
})();
