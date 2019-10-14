'use strict';

angular.module('app')
  .directive('featuredTechnologies',function(){
    return {
      templateUrl:'app/admin/directives/manage-specific-fiesta/directives/menu-items/featured-technologies/featured-technologies.ejs',
      restrict: 'E'
    };
  }
);
