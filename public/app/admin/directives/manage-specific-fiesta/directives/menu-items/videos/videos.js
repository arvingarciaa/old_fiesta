'use strict';

angular.module('app')
  .directive('videos',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/videos/videos.ejs',
      restrict: 'E'
    };
  }
);
