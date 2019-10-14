'use strict';

angular.module('app')
  .directive('editMore',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/more/modals/edit-more/edit-more.ejs',
      restrict: 'E'
    };
  }
);
