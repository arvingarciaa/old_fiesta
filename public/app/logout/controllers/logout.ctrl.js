'use strict';

(function () {
  angular.module('app')
         .controller('LogoutCtrl', LogoutCtrl);

  LogoutCtrl.$inject = ['AuthSrvc', '$window'];

  function LogoutCtrl(AuthSrvc, $window) {
    AuthSrvc.LogoutAdmin();
    $window.location.href = '/login?logged_out=1';
  }
})();
