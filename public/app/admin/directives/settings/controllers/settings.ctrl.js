'use strict';

(function () {
  angular.module('app')
        .controller('SettingsCtrl', SettingsCtrl);

	SettingsCtrl.$inject = ['$scope', '$filter', '$location', '$window', 'FiestaSrvc', 'AuthSrvc', 'UtilsSrvc'];

	function SettingsCtrl($scope, $filter, $location, $window, FiestaSrvc, AuthSrvc, UtilsSrvc) {
    $scope.goTo = function (url) {
      $location.url(url);
    };
    if(AuthSrvc.IsLoggedIn()){
      $scope.loggedIn = true;
      $scope.admin = AuthSrvc.GetAdmin();
      $scope.isAdmin = (AuthSrvc.GetAdmin().isAdmin) || false;
      FiestaSrvc.GetPhilippines()
        .then(function (data) {
          $scope.philippines = data;
        });

      $scope.setting = {
        name: false,
        email: false,
        location: false,
        password: false
      };

      $scope.philippines = {};
      $scope.provinces = [];

      $scope.select = function (option) {
        for (var opt in $scope.setting) {
          if ($scope.setting.hasOwnProperty(opt)) {
            $scope.setting[opt] = (opt==option);
          }
        }
      };

      $scope.regionToggled = function () {
        $scope.province = '';
        $scope.provinces = [];
        $scope.provinceEmpty = false;
        $scope.regionEmpty = false;
        $scope.city = '';
        $scope.cities = [];
        $scope.regionEmpty = ($scope.region=='');
        if (!$scope.regionEmpty) {
          $scope.provinces = $filter('filter')($scope.philippines.provinces, {region: $scope.region.split(',')[0]});
        }
      };

      $scope.provinceToggled = function () {
        if(!$scope.province || $scope.province == '') return;
        $scope.city = '';
        $scope.cities = [];
        $scope.provinceEmpty = ($scope.province=='');
        if (!$scope.provinceEmpty) {
          $scope.cities = $filter('filter')($scope.philippines.cities, {province: $scope.province.split(',')[0]});
        }
      };

      $scope.ChangeAdminName = function (name) {
        $scope.nameLoading = true;
        FiestaSrvc.ChangeAdminName(name)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              AuthSrvc.UpdateAdmin(data);
              $scope.admin = data;
              $scope.name = '';
              $scope.setting['name'] = false;
              $scope.nameLoading = false;
              UtilsSrvc.ToastSuccess('Updated successfully!');
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            $scope.nameLoading = false;
          });
      };
      $scope.ChangeAdminEmail = function (email) {
        $scope.emailLoading = true;
        FiestaSrvc.ChangeAdminEmail(email)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              AuthSrvc.UpdateAdmin(data);
              $scope.admin = data;
              $scope.email = '';
              $scope.setting['email'] = false;
              $scope.emailLoading = false;
              UtilsSrvc.ToastSuccess('Updated successfully!');
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            $scope.emailLoading = false;
          });
      };
      $scope.ChangeAdminLocation = function (city, province, region) {
        $scope.locationLoading = true;
        FiestaSrvc.ChangeAdminLocation(city, province.split(',')[1], region.split(',')[1])
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              AuthSrvc.UpdateAdmin(data);
              $scope.admin = data;
              $scope.city = '';
              $scope.province = '';
              $scope.region = '';
              $scope.setting['location'] = false;
              $scope.locationLoading = false;
              $scope.provinces = [];
              $scope.provinceEmpty = false;
              $scope.regionEmpty = false;
              $scope.cities = [];
              UtilsSrvc.ToastSuccess('Updated successfully!');
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError('Something went wrong!');
            $scope.locationLoading = false;
          });
      };
      $scope.ChangeAdminPassword = function (oldPassword, newPassword1, newPassword2) {
        if(newPassword1 != newPassword2){
          UtilsSrvc.ToastError('New password doesn\'t match!');
          return;
        }
        $scope.passwordLoading = true;
        FiestaSrvc.ChangeAdminPassword(oldPassword, newPassword1)
          .then(function (data) {
            UtilsSrvc.wait(1000, function () {
              AuthSrvc.LogoutAdmin();
              $window.location.href = '/login?url='+$location.path();
              $scope.passwordLoading = false;
            });
          })
          .catch(function (err) {
            UtilsSrvc.ToastError(err.data.message);
            $scope.passwordLoading = false;
          });
      };
    }


  }
})();
