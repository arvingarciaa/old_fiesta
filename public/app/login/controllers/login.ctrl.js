'use strict';

(function () {
  angular.module('app')
         .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$location', '$routeParams', 'AuthSrvc', 'UtilsSrvc', '$window'];

  function LoginCtrl($scope, $location, $routeParams , AuthSrvc, UtilsSrvc, $window) {
    if(AuthSrvc.IsLoggedIn(true)){
       $location.path($routeParams.url || '/admin');
    }
    else{
      angular.element('title')[0].innerHTML = 'Login | Fiesta'
      $scope.noSession = true;
      $scope.loggedOut = $routeParams.logged_out || false;
      $scope.sessionExpired = $routeParams.session_expired || false;
      $scope.authFailed = $routeParams.auth_failed || false;
      let user = {
        email: '',
        password: ''
      };
      angular.copy(user, $scope.user);
      $scope.authenticate = function (account) {
        if(account.email.trim() == '' ||  account.password.trim() == ''){
          UtilsSrvc.ToastError('Please enter all details required!');
          return;
        }
        $scope.loading = true;
        AuthSrvc.AuthenticateAdmin(account.email, account.password)
          .then(function (res) {
            console.log(res.admin);
            AuthSrvc.SaveSession(res.admin, res.token);
            $window.location.href = $routeParams.url || '/admin';
            $scope.loading = false;
          })
          .catch(function (res) {
            UtilsSrvc.ToastError(res.message);
            $scope.loading = false;
          });
      };
    }

  }
})();
