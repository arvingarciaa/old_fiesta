'use strict';

angular.module('app')
  .directive('executive',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/executive/executive.ejs',
      restrict: 'E'
    };
  }
);
