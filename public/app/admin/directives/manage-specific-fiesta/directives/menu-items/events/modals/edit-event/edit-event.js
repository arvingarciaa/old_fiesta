'use strict';

angular.module('app')
  .directive('editEvent',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/events/modals/edit-event/edit-event.ejs',
      restrict: 'E'
    };
  }
);
