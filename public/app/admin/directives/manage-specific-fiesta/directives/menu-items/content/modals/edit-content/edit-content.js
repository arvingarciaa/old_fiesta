'use strict';

angular.module('app')
  .directive('editContent',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/content/modals/edit-content/edit-content.ejs',
      restrict: 'E'
    };
  }
);
