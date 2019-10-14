'use strict';

angular.module('app')
  .directive('viewContent',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/content/modals/view-content/view-content.ejs',
      restrict: 'E'
    };
  }
);
