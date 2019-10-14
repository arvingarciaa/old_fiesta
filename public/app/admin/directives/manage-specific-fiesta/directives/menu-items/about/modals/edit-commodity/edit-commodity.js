'use strict';

angular.module('app')
  .directive('editCommodity',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-commodity/edit-commodity.ejs',
      restrict: 'E'
    };
  }
);
