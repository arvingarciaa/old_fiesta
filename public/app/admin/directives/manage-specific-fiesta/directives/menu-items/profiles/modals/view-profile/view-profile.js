'use strict';

angular.module('app')
  .directive('viewProfile',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/profiles/modals/view-profile/view-profile.ejs',
      restrict: 'E'
    };
  }
);
