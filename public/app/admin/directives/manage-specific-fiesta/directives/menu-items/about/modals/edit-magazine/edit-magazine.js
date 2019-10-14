'use strict';

angular.module('app')
  .directive('editMagazine',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-magazine/edit-magazine.ejs',
      restrict: 'E'
    };
  }
);
