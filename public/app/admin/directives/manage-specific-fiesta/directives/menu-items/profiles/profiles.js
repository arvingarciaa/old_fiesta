'use strict';

angular.module('app')
  .directive('profile',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/profiles/profiles.ejs',
      restrict: 'E'
    };
  }
);
