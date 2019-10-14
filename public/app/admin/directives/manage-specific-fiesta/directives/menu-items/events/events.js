'use strict';

angular.module('app')
  .directive('event',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/events/events.ejs',
      restrict: 'E'
    };
  }
);
