'use strict';

(function () {
  angular.module('app')
         .controller('LostCtrl', LostCtrl);

  LostCtrl.$inject = ['$scope', 'AuthSrvc', '$window', '$routeParams'];

  function LostCtrl($scope, AuthSrvc, $window, $routeParams) {
    $scope.message = ($routeParams.why == 'fiesta_not_found')? 'the fiesta you are looking for can\'t be found.': 'the page you are looking for is lost.';
    $scope.type = ($routeParams.why == 'fiesta_not_found')? 'Fiesta': 'Page';

    $scope.button = ($routeParams.admin == 'true')? 'Back to Dashboard': 'Explore other fiestas';
    $scope.href = ($routeParams.admin == 'true')? '/admin': '/fiesta';
  }
})();
