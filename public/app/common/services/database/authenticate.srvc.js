"use strict";

(function () {
  angular.module("app")
         .factory("AuthSrvc", AuthSrvc);

  AuthSrvc.$inject = ['$http', '$q', '$cookies', 'jwtHelper', '$window', '$location'];

  function AuthSrvc($http, $q, $cookies, jwtHelper, $window, $location) {
    let dbUrl = 'api';
    var service = {};

    /***************************************************************************
     @INFO: Fiesta Services
    ***************************************************************************/
    service.AuthenticateAdmin = AuthenticateAdmin;
    service.SaveSession = SaveSession;
    service.IsLoggedIn = IsLoggedIn;
    service.GetAdmin = GetAdmin;
    service.UpdateAdmin = UpdateAdmin;
    service.GetToken = GetToken;
    service.LogoutAdmin = LogoutAdmin;
    return service;


    /***************************************************************************
     @INFO: Function Definitions
    ***************************************************************************/
    function AuthenticateAdmin(email, password) {
      let deferred = $q.defer();
      $http.post(dbUrl+'/authenticate/admin', {email: email.toString(), password: password.toString()})
        .then(function (success) {
          deferred.resolve(success.data);
        }, function (error) {
          deferred.reject(error.data);
        });
      return deferred.promise;
    }

    function SaveSession(admin, token) {
      $cookies.put('access_token', token);
      $cookies.put('admin', angular.toJson(admin));
    }

    function GetAdmin() {
      let admin = $cookies.getObject('admin');
      return (admin);
    }

    function UpdateAdmin(admin){
      $cookies.remove('admin');
      $cookies.put('admin', angular.toJson(admin));
    }

    function GetToken(){
      let token = $cookies.get('access_token');
      return token;
    }

    function LogoutAdmin() {
      $cookies.remove('access_token');
      $cookies.remove('admin');
    }

    function IsLoggedIn(stay) {
      let isExpired;
      try {
        isExpired = jwtHelper.isTokenExpired(GetToken());
        if(GetAdmin()=='' || GetToken()=='' || isExpired){
          LogoutAdmin();
          if(!stay) $window.location.href = '/login?session_expired=1&url='+$location.path();
          return false;
        }
      } catch (e) {
        isExpired = true;
        LogoutAdmin();
        if(!stay) $window.location.href = '/login?auth_failed=1&url='+$location.path();
        return false;
      }
      return true;
    }
  }
})();
