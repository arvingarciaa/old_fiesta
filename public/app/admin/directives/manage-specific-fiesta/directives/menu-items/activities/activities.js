'use strict';

angular.module('app')
  .directive('activities',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/activities/activities.ejs',
      restrict: 'E'
    };
  }
);
