'use strict';

angular.module('app')
  .directive('activityModal',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/activities/activity-modal/activity-modal.ejs',
      restrict: 'E'
    };
  }
);
