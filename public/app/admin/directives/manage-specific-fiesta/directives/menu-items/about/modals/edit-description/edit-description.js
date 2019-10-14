'use strict';

angular.module('app')
  .directive('editDescription',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-description/edit-description.ejs',
      restrict: 'E'
    };
  }
);
