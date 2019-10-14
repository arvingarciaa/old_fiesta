'use strict';

angular.module('app')
  .directive('posterModal',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/posters/poster-modal/poster-modal.ejs',
      restrict: 'E'
    };
  }
);
