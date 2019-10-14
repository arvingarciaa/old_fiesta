'use strict';

angular.module('app')
  .directive('viewTech',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/featured-technologies/modals/view-tech/view-tech.ejs',
      restrict: 'E'
    };
  }
);
