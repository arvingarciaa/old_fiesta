'use strict';

angular.module('app')
  .directive('viewEvent',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/events/modals/view-event/view-event.ejs',
      restrict: 'E'
    };
  }
);
