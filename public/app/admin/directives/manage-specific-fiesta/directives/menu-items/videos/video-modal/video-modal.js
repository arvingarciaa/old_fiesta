'use strict';

angular.module('app')
  .directive('videoModal',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/videos/video-modal/video-modal.ejs',
      restrict: 'E'
    };
  }
);
