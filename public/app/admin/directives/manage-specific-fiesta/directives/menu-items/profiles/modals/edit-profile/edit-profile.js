'use strict';

angular.module('app')
  .directive('editProfile',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/profiles/modals/edit-profile/edit-profile.ejs',
      restrict: 'E'
    };
  }
);
