'use strict';

angular.module('app')
  .directive('photoModal',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/photos/photo-modal/photo-modal.ejs',
      restrict: 'E'
    };
  }
);
