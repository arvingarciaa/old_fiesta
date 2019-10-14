'use strict';

angular.module('app')
  .directive('editTech',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/featured-technologies/modals/edit-tech/edit-tech.ejs',
      restrict: 'E'
    };
  }
);
