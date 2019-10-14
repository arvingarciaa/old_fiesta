'use strict';

angular.module('app')
  .directive('awardModal',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/awards/award-modal/award-modal.ejs',
      restrict: 'E'
    };
  }
);
