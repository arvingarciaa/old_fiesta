'use strict';

angular.module('app')
  .directive('about',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/about.ejs',
      restrict: 'E'
    };
  }
);
