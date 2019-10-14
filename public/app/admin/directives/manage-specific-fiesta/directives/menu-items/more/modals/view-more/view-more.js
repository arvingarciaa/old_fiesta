'use strict';

angular.module('app')
  .directive('viewMore',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/more/modals/view-more/view-more.ejs',
      restrict: 'E'
    };
  }
);
