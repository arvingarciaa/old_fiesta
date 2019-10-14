'use strict';

(function () {
  angular.module('app')
        .controller('CreateFiestaModalCtrl', CreateFiestaModalCtrl);

	CreateFiestaModalCtrl.$inject = ['$scope', '$timeout', '$location', 'CreateFiestaModalSrvc', 'UtilsSrvc'];

	function CreateFiestaModalCtrl($scope, $timeout, $location, CreateFiestaModalSrvc, UtilsSrvc) {
    /***************************************************************************
     @INFO: Scope Variables
    ***************************************************************************/
    $scope.title = '';
    $scope.startDate = null;
    $scope.endDate = null;
    $scope.warning = '';
    $scope.successfulCreation = false;

    /***************************************************************************
     @INFO: Scope Functions
    ***************************************************************************/
    /**
     * - Removes all 'has-error' class in each form-group
     * - Retrieves the values from title, start and end date
     * - Checks if invalid input
     * - Checks if invalid input
     */
    $scope.createFiesta = function () {
      // remove all validation alerts in input tags
      angular.element('.form-group.create-validation').removeClass('has-error');

      // check fiesta title
      if(!$scope.title || $scope.title == ''){
        alertError('Please enter title.');
        angular.element('div.form-group.fiestaTitle').addClass('has-error');
        return;
      }
      // check start
      if(!$scope.startDate){
        alertError('Please specify start date.');
        angular.element('div.form-group.startDate').addClass('has-error');
        return;
      }
      // check end
      if(!$scope.endDate){
        alertError('Please specify end date.');
        angular.element('div.form-group.endDate').addClass('has-error');
        return;
      }
      // check if end date is earlier than start date
      if($scope.startDate > $scope.endDate){
        alertError('Start date must be earlier than end date.');
        angular.element('div.form-group.startDate').addClass('has-error');
        angular.element('div.form-group.endDate').addClass('has-error');
        return;
      }
      // check for illegal characters for fiesta title
      if(!/^[a-zA-Z0-9:@\-&, ]+$/.test($scope.title)){
        alertError('Invalid characters in fiesta title!');
        angular.element('div.form-group.fiestaTitle').addClass('has-error');
        return;
      }

      // clear all warnings and error reports
      $scope.warning = '';
      // show loading bar
      $scope.successfulCreation = true;
      CreateFiestaModalSrvc .CreateFiesta($scope.title, $scope.startDate, $scope.endDate)
        .then(function (response) {
          UtilsSrvc.wait(1000, function () {
            // hide loading bar
            $scope.successfulCreation = false;
            angular.element('#createFiesta').modal('hide');
            UtilsSrvc.wait(500, function () {
              $location.path('/admin/manage/'+response._id);
            });
          });
        })
        .catch(function (error) {
          $scope.successfulCreation = true;
          alertError('Something went wrong! Error: ' + error.toString());
        });
    };

    /***************************************************************************
     @INFO: Utility Functions
    ***************************************************************************/
    /**
     * Displays a warning message in an alert with an id = #inputAlert
     * - @param {string} message - to display as warning
     */
    function alertError(message){
      $scope.warning = message;
      angular.element('#inputAlert').addClass('shake');
      $timeout(function () {
        angular.element('#inputAlert').removeClass('shake');
      }, 1000);
    }
  }
})();
