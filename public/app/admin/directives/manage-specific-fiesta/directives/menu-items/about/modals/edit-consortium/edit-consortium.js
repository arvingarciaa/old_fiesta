'use strict';

angular.module('app')
  .directive('editConsortium',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-consortium/edit-consortium.ejs',
      restrict: 'E'
    };
  }
);
