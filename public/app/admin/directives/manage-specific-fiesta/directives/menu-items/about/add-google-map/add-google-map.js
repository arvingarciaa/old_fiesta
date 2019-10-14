'use strict';

angular.module('app')
  .directive('addGoogleMap',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/add-google-map/add-google-map.ejs',
      restrict: 'E'
    };
  }
);
