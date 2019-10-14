'use strict';

angular.module('app')
  .directive('content',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/content/content.ejs',
      restrict: 'E'
    };
  }
);
