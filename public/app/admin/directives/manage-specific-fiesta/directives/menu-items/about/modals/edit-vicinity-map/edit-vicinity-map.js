'use strict';

angular.module('app')
  .directive('editVicinityMap',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-vicinity-map/edit-vicinity-map.ejs',
      restrict: 'E'
    };
  }
);
