'use strict';

angular.module('app')
  .directive('posters',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/posters/posters.ejs',
      restrict: 'E'
    };
  }
);
