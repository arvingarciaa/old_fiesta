'use strict';

angular.module('app')
  .directive('editVenue',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/about/modals/edit-venue/edit-venue.ejs',
      restrict: 'E'
    };
  }
);
