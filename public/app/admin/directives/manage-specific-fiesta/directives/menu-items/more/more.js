'use strict';

angular.module('app')
  .directive('more',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/more/more.ejs',
      restrict: 'E'
    };
  }
);
