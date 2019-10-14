'use strict';

angular.module('app')
  .directive('editRegion',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-region/edit-region.ejs',
      restrict: 'E'
    };
  }
);
