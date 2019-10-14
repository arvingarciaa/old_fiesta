'use strict';

angular.module('app')
  .directive('editTitle',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-title/edit-title.ejs',
      restrict: 'E'
    };
  }
);
