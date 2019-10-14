'use strict';

(function () {
  angular.module('app')
        .controller('MoreCtrl', MoreCtrl);

	MoreCtrl.$inject = ['$scope', '$routeParams', 'UtilsSrvc', 'FiestaSrvc'];

	function MoreCtrl($scope, $routeParams, UtilsSrvc, FiestaSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    let fiestaId = $routeParams.fiestaId;
    $scope.options = UtilsSrvc.GetSummernoteOptions();
    $scope.action = '';
    $scope.writeup = {
      'title': '',
      'body': '',
    };
    $scope.mores = [];

    let GetMores = FiestaSrvc.GetAllMore;
    GetMores(fiestaId)
      .then(function (mores) {
        $scope.mores = mores;
      })
      .catch(function (err) {
        UtilsSrvc.error(err);
      });

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    $scope.add = function () {
      $scope.action='add';
      $scope.writeup = {title:'',body:''};
    }
    $scope.select = function (item) {
      $scope.action = 'edit';
      angular.copy(item, $scope.writeup);
    }
    $scope.AddMore = function (item) {
      let AddMore = FiestaSrvc.AddMore;
      $scope.moreLoading = true;
      AddMore(fiestaId, item)
        .then(function (more) {
          UtilsSrvc.wait(1000, function () {
            $scope.writeup = {
              'title': '',
              'body': '',
            };
            $scope.mores.push(more);
            UtilsSrvc.ToastSuccess('Added more!');
            angular.element('#editMore').modal('hide');
            $scope.moreLoading = false;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.moreLoading = false;
        });
    }

    $scope.EditMore = function (item) {
      let EditMore = FiestaSrvc.EditMore;
      $scope.moreLoading = true;
      EditMore(fiestaId, item)
        .then(function (edited) {
          UtilsSrvc.wait(1000, function () {
            UtilsSrvc.UpdateObjectInList($scope.mores, item._id, edited);
            UtilsSrvc.ToastSuccess('Edited more!');
            angular.element('#editMore').modal('hide');
            $scope.moreLoading = false;
          });
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
          $scope.moreLoading = false;
        });
    }

    $scope.DeleteMore = function (id) {
      if (UtilsSrvc.Ask('Delete this more?')) {
        let DeleteMore = FiestaSrvc.DeleteMore;

        DeleteMore(fiestaId, id)
        .then(function (success) {
          UtilsSrvc.RemoveObjectInList($scope.mores, id);
          UtilsSrvc.ToastSuccess('Deleted more!');
        })
        .catch(function (err) {
          UtilsSrvc.ToastError(err);
          UtilsSrvc.error(err);
        });
      }

    }

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
  }
})();
