'use strict';

(function () {
  angular.module('app')
        .controller('ManageAccountCtrl', ManageAccountCtrl);

	ManageAccountCtrl.$inject = ['$scope', '$filter', '$window', 'FiestaSrvc', 'AuthSrvc', 'UtilsSrvc'];

	function ManageAccountCtrl($scope, $filter, $window, FiestaSrvc, AuthSrvc, UtilsSrvc) {
    if(!AuthSrvc.GetAdmin().isAdmin){
      $window.location.href = '/admin';
    }
    $scope.philippines = {};
    $scope.provinces = [];

    $scope.regionEmpty = true;
    $scope.provinceEmpty = true;
    $scope.acc = {
      name: '',
      email: '',
      region: '',
      province: '',
      city: ''
    };

    FiestaSrvc.GetAllAdmin()
      .then(function (data) {
        $scope.accounts = data;
      })
      .catch(function (err) {
        UtilsSrvc.ToastError('Something went wrong!');
        UtilsSrvc.error(err);
      });

    FiestaSrvc.GetPhilippines()
      .then(function (data) {
        $scope.philippines = data;
        console.log(data);
      });


    $scope.regionToggled = function () {
      $scope.acc.province = '';
      $scope.provinces = [];
      $scope.provinceEmpty = false;
      $scope.regionEmpty = false;
      $scope.acc.city = '';
      $scope.cities = [];
      $scope.regionEmpty = ($scope.acc.region=='');
      if (!$scope.regionEmpty) {
        $scope.provinces = $filter('filter')($scope.philippines.provinces, {region: $scope.acc.region.split(',')[0]});
      }
    };

    $scope.provinceToggled = function () {
      if(!$scope.acc.province || $scope.acc.province == '') return;
      $scope.acc.city = '';
      $scope.cities = [];
      $scope.provinceEmpty = ($scope.acc.province=='');
      if (!$scope.provinceEmpty) {
        $scope.cities = $filter('filter')($scope.philippines.cities, {province: $scope.acc.province.split(',')[0]});
      }
    };

    $scope.Create = function () {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if($scope.acc.email == '' || !regex.test($scope.acc.email)){
        UtilsSrvc.ToastError('Wrong input for email!'); return;
      }
      if($scope.acc.name == ''){
        UtilsSrvc.ToastError('Wrong input for name!'); return;
      }
      if($scope.acc.region =='' || $scope.acc.region.split(',')[1] == ''){
        UtilsSrvc.ToastError('Wrong input for region!'); return;
      }
      if($scope.acc.province =='' || $scope.acc.province.split(',')[1] == ''){
        UtilsSrvc.ToastError('Wrong input for province!'); return;
      }
      if($scope.acc.city == ''){
        UtilsSrvc.ToastError('Wrong input for city!'); return;
      }

      $scope.acc.region = $scope.acc.region.split(',')[1];
      $scope.acc.province = $scope.acc.province.split(',')[1];

      $scope.loading = true;
      FiestaSrvc.AddAdmin($scope.acc)
        .then(function (data) {
          $scope.regionEmpty = true;
          $scope.provinceEmpty = true;
          $scope.acc = {
            name: '',
            email: '',
            region: '',
            province: '',
            city: ''
          };
          $scope.loading = false;
          $scope.name = data.name;
          $scope.email = data.email;
          $scope.accounts.push(data);
          angular.element('#addAccount').modal('hide');
          angular.element('#successfull').modal('show');
        })
        .catch(function (err) {
          UtilsSrvc.ToastError('Something went wrong!');
          console.log(err);
        });
    };
  }
})();
