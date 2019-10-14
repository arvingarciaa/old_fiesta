'use strict';

angular.module('app')
  .directive('photos',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/photos/photos.ejs',
      restrict: 'E'
    };
  }
);
