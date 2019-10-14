'use strict';

angular.module('app')
  .directive('editDate',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-date/edit-date.ejs',
      restrict: 'E'
    };
  }
);
