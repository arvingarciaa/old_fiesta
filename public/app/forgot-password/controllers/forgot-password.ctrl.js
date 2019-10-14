'use strict';

(function () {
  angular.module('app')
         .controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

  ForgotPasswordCtrl.$inject = ['$scope', 'FiestaSrvc', 'UtilsSrvc'];

  function ForgotPasswordCtrl($scope, FiestaSrvc, UtilsSrvc) {
    $scope.RetrieveAccount = function (email) {
      $scope.loading = true;
      FiestaSrvc.ForgotPassword(email)
        .then(function (res) {
          UtilsSrvc.wait(1000, function () {
            $scope.emailSent = true;
            $scope.loading = false;
          });
        })
        .catch(function (err) {
          if(err.data.statusCode == 404)
            UtilsSrvc.ToastError('Email was not found!');
          else
            UtilsSrvc.ToastError('Something went wrong!');
          $scope.loading = false;
        });
    }
  }
})();
