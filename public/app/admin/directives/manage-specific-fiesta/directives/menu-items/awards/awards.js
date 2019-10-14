'use strict';

angular.module('app')
  .directive('awards',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/awards/awards.ejs',
      restrict: 'E'
    };
  }
);
